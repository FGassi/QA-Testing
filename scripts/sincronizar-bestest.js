
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env'),
});

const token = process.env.BESTEST_API_TOKEN;

if (!token) {
    throw new Error('BESTEST_API_TOKEN não foi definida no ambiente.');
}

// Caminho do relatório gerado pelo Playwright
const caminhoRelatorio = path.resolve(
    __dirname,
    '../test-results/results.json'
);

// Leitura e conversão do JSON para objeto JavaScript
const relatorio = JSON.parse(
    fs.readFileSync(caminhoRelatorio, 'utf-8')
);

// Percorre as suítes para encontrar os testes
function encontrarTestes(suites) {
    const testesEncontrados = [];

    for (const suite of suites) {
        testesEncontrados.push(...(suite.specs || []));

        if (suite.suites) {
            testesEncontrados.push(
                ...encontrarTestes(suite.suites)
            );
        }
    }

    return testesEncontrados;
}

const specs = encontrarTestes(relatorio.suites);

// Extrai os resultados dos testes de API
const resultados = [];

for (const spec of specs) {
    const identificador = spec.title.match(/AQ-TC-\d+/)?.[0];

    if (!identificador) continue;

    for (const teste of spec.tests) {
        // Considera somente o projeto API
        if (teste.projectName !== 'api') continue;

        const tentativas = teste.results;

        if (tentativas.length === 0) continue;

        // Considera a última tentativa realizada
        const ultimaTentativa = tentativas[tentativas.length - 1];

        const statusMapeado = {
            passed: 'PASSED',
            failed: 'FAILED',
            timedOut: 'FAILED',
            interrupted: 'FAILED',
            skipped: 'SKIPPED',
        };

        const resultado = statusMapeado[ultimaTentativa.status];

        if (!resultado) {
            throw new Error(
                `Status não reconhecido para ${identificador}: ${ultimaTentativa.status}`
            );
        }

        resultados.push({
            caso: identificador,
            resultado,
            tentativas: tentativas.length,
            instavel: teste.status === 'flaky',
            projeto: teste.projectName,
        });
    }
}

// Exibe os resultados extraídos
console.table(resultados);

// Verifica se todos os 14 casos foram encontrados
if (resultados.length === 0) {
    throw new Error('Nenhum teste de API foi encontrado no relatório do Playwright.');
}



async function consultarExecucoes() {
    const baseUrl = 'https://prod-us.getbestest.com/api/v1';

    const execucoesEncontradas = [];

    for (const resultado of resultados) {
        const filtro = new URLSearchParams({
            filter: `testCycle.testCycleKey = 'AQ-CY-3' AND testCase.testCaseKey = '${resultado.caso}'`
        });

        const response = await fetch(
            `${baseUrl}/test_case_executions?${filtro}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.api+json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(
                `Erro ao consultar ${resultado.caso}: ${response.status} ${response.statusText}`
            );
        }

        const dados = await response.json();

        if (dados.data.length !== 1) {
            throw new Error(
                `${resultado.caso}: esperada 1 execução no BesTest, mas foram encontradas ${dados.data.length}.`
            );
        }

        const execucao = dados.data[0];

        // Consulta individual para obter o ETag
        const responseIndividual = await fetch(
            `${baseUrl}/test_case_executions/${execucao.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.api+json'
                }
            }
        );

        if (!responseIndividual.ok) {
            throw new Error(
                `Erro ao consultar ETag de ${resultado.caso}: ${responseIndividual.status} ${responseIndividual.statusText}`
            );
        }

        const etag = responseIndividual.headers.get('etag');

        if (!etag) {
            throw new Error(`ETag não encontrado para ${resultado.caso}.`);
        }

        execucoesEncontradas.push({
            caso: resultado.caso,
            resultadoPlaywright: resultado.resultado,
            idExecucao: execucao.id,
            chaveExecucao: execucao.attributes.testCaseExecutionKey,
            resultadoBesTest: execucao.attributes.result,
            etag
        });
    }

    console.table(execucoesEncontradas);

    console.log(
        `\nTotal de execuções encontradas: ${execucoesEncontradas.length}`
    );

    return execucoesEncontradas;
}



async function atualizarExecucao() {
        const execucoes = await consultarExecucoes();

        const baseUrl = 'https://prod-us.getbestest.com/api/v1';

        for (const execucao of execucoes) {
            if (execucao.resultadoBesTest === execucao.resultadoPlaywright) {
                console.log(
                    `${execucao.caso}: sem alteração (já está ${execucao.resultadoPlaywright}).`
                );
                continue;
            }

            const corpoRequisicao = {
                data: {
                    type: 'test_case_executions',
                    id: execucao.idExecucao,
                    attributes: {
                        result: execucao.resultadoPlaywright,
                        comments: 'Resultado sincronizado automaticamente pelo Playwright.'
                    }
                }
            };

            const response = await fetch(
                `${baseUrl}/test_case_executions/${execucao.idExecucao}`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                        'If-Match': execucao.etag
                    },
                    body: JSON.stringify(corpoRequisicao)
                }
            );

            if (!response.ok) {
                const erro = await response.text();

                throw new Error(
                    `Erro ao atualizar ${execucao.caso}: ${response.status} - ${erro}`
                );
            }

            const dados = await response.json();

            console.log({
                caso: execucao.caso,
                chaveExecucao: execucao.chaveExecucao,
                resultado: dados.data.attributes.result
            });
        }

    console.log('\nSincronização concluída.');
}


atualizarExecucao().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
