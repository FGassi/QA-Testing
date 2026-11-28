
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env'),
});

const token = process.env.BESTEST_API_TOKEN;
const MODO_SIMULACAO = false;

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

console.log('Quantidade de suites:', relatorio.suites?.length);
console.log('Quantidade de specs encontrados:', specs.length);

console.log(
    'Dados encontrados no relatório:',
    JSON.stringify(
        specs.map(spec => ({
            arquivo: spec.file,
            titulo: spec.title,
            testes: (spec.tests || []).map(teste => ({
                projeto: teste.projectName,
                quantidadeResultados: teste.results?.length
            }))
        })),
        null,
        2
    )
);

// Define os ciclos e as faixas de casos de cada User Story
const configuracaoStories = {
    'AQ-2': {
        ciclos: {
            UI: 'AQ-CY-2',
            API: 'AQ-CY-3',
        },
        validarCaso: {
            UI: numero => numero >= 1 && numero <= 8 && numero !== 2,
            API: numero => numero >= 9 && numero <= 22,
        },
    },

    'AQ-3': {
        ciclos: {
            UI: 'AQ-CY-6',
            API: 'AQ-CY-5',
        },
        validarCaso: {
            UI: numero => numero >= 23 && numero <= 26,
            API: numero => numero >= 27 && numero <= 29,
        },
    },

    'AQ-4': {
        ciclos: {
            UI: 'AQ-CY-8',
        },
        validarCaso: {
            UI: numero => [30, 33, 34].includes(numero),
        },
    },

    'AQ-5': {
        ciclos: {
            UI: 'AQ-CY-9',
            API: 'AQ-CY-10',
        },
        validarCaso: {
            UI: numero => [31, 36].includes(numero),
            API: numero => [32, 35, 37].includes(numero),
        },
    },

    'AQ-9': {
        ciclos: {
            UI: 'AQ-CY-12',
            API: 'AQ-CY-11',
        },
        validarCaso: {
            UI: numero => [47,48,49,50,51].includes(numero),
            API: numero => [52,53].includes(numero),
        },
    },

    'AQ-11': {
        ciclos: {
            API: 'AQ-CY-13',
        },
        validarCaso: {
            API: numero => [45,46].includes(numero),
        },
    },

    'AQ-12': {
        ciclos: {
            UI: 'AQ-CY-14',
        },
        validarCaso: {
            UI: numero => [59,60].includes(numero),
        },
    },
};

// Identifica a User Story, o tipo de teste e o ciclo correspondente
function identificarCiclo(spec, projeto, identificador) {
    let tipo;

    if (projeto === 'api') {
        tipo = 'API';
    } else if (['chromium', 'firefox', 'webkit'].includes(projeto)) {
        tipo = 'UI';
    } else {
        return null;
    }

    // Identifica a User Story pelo caminho do arquivo
    const correspondencia = spec.file.match(
        /(?:^|[\\/])(AQ-\d+)(?:[\\/])/i
    );

    if (!correspondencia) {
        throw new Error(
            `${identificador}: não foi possível identificar a User Story pelo arquivo ${spec.file}.`
        );
    }

    const story = correspondencia[1].toUpperCase();
    const configuracao = configuracaoStories[story];

    if (!configuracao) {
        throw new Error(
            `${identificador}: não existe configuração para a User Story ${story}.`
        );
    }

    // Valida se o caso pertence à faixa esperada para UI ou API
    const numeroCaso = Number(identificador.match(/\d+$/)[0]);

    if (!configuracao.validarCaso[tipo](numeroCaso)) {
        throw new Error(
            `${identificador}: caso incompatível com ${story} / ${tipo}. Arquivo: ${spec.file}.`
        );
    }

    return {
        tipo,
        ciclo: configuracao.ciclos[tipo],
    };
}
// Extrai e consolida os resultados dos testes
const resultadosAgrupados = new Map();

const statusMapeado = {
    passed: 'PASSED',
    failed: 'FAILED',
    timedOut: 'FAILED',
    interrupted: 'BLOCKED',
    skipped: 'SKIPPED',
};

for (const spec of specs) {
    const identificador = spec.title.match(/AQ-TC-\d+/)?.[0];

    if (!identificador) continue;

    for (const teste of spec.tests) {
        const projeto = teste.projectName;

        // Identifica o tipo de teste e o ciclo correspondente
        const identificacao = identificarCiclo(spec, projeto, identificador);

        if (!identificacao) continue;

        const { tipo, ciclo } = identificacao;

        const tentativas = teste.results;

        if (tentativas.length === 0) continue;

        // Considera a última tentativa realizada
        const ultimaTentativa = tentativas[tentativas.length - 1];

        const resultado = statusMapeado[ultimaTentativa.status];

        if (!resultado) {
            throw new Error(
                `Status não reconhecido para ${identificador}: ${ultimaTentativa.status}`
            );
        }

        // Cria o agrupamento na primeira ocorrência do caso
        if (!resultadosAgrupados.has(identificador)) {
            resultadosAgrupados.set(identificador, {
                caso: identificador,
                tipo,
                ciclo,
                resultados: [],
                navegadores: [],
                tentativas: 0,
                instavel: false,
            });
        }

        const grupo = resultadosAgrupados.get(identificador);

        if (grupo.tipo !== tipo || grupo.ciclo !== ciclo) {
            throw new Error(
                `${identificador}: encontrado com tipos ou ciclos diferentes no relatório.`
            );
        }

        grupo.resultados.push(resultado);
        grupo.navegadores.push(projeto);
        grupo.tentativas += tentativas.length;
        grupo.instavel ||= teste.status === 'flaky';
    }
}

// Consolida os resultados de cada caso
const resultados = [];

for (const grupo of resultadosAgrupados.values()) {
    let resultado;

    if (grupo.resultados.includes('FAILED')) {
        resultado = 'FAILED';

    } else if (grupo.resultados.includes('BLOCKED')) {
        resultado = 'BLOCKED';

    } else if (grupo.resultados.every(status => status === 'PASSED')) {
        resultado = 'PASSED';

    } else if (grupo.resultados.every(status => status === 'SKIPPED')) {
        resultado = 'SKIPPED';

    } else {
        resultado = 'BLOCKED';
    }

    resultados.push({
        caso: grupo.caso,
        tipo: grupo.tipo,
        ciclo: grupo.ciclo,
        resultado,
        navegadores: grupo.navegadores.join(', '),
        tentativas: grupo.tentativas,
        instavel: grupo.instavel,
    });
}

console.table(resultados);

// Verifica se algum teste foi encontrado
if (resultados.length === 0) {
    throw new Error(
        'Nenhum teste de UI ou API foi encontrado no relatório do Playwright.'
    );
}



async function consultarExecucoes() {
    const baseUrl = 'https://prod-us.getbestest.com/api/v1';

    const execucoesEncontradas = [];

    for (const resultado of resultados) {
        const filtro = new URLSearchParams({
            filter: `testCycle.testCycleKey = '${resultado.ciclo}' AND testCase.testCaseKey = '${resultado.caso}'`,
            sort: '-createdAt',
            'page[size]': '100',
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

        if (!dados.data || dados.data.length === 0) {
            throw new Error(
                `${resultado.caso}: nenhuma execução encontrada no BesTest para o ciclo ${resultado.ciclo}.`
            );
        }

        const execucao = dados.data[0];

        console.log(
            `${resultado.caso}: execução selecionada ${execucao.attributes.testCaseExecutionKey}, criada em ${execucao.attributes.createdAt}.`
        );

        if (dados.data.length > 1) {
            console.log(
                `${resultado.caso}: ${dados.data.length} execuções encontradas. Selecionada a mais recente: ${execucao.attributes.testCaseExecutionKey}.`
            );
        }

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
            tipo: resultado.tipo,
            ciclo: resultado.ciclo,
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
            if (MODO_SIMULACAO) {
                console.log(
                `${execucao.caso}: simulação — seria atualizado de ${execucao.resultadoBesTest} para ${execucao.resultadoPlaywright}.`
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
                tipo: execucao.tipo,
                ciclo: execucao.ciclo,
                chaveExecucao: execucao.chaveExecucao,
                resultado: dados.data.attributes.result
            });
        }

    console.log(
    MODO_SIMULACAO
        ? '\nSimulação concluída. Nenhuma alteração foi enviada ao BesTest.'
        : '\nSincronização concluída.'
    );
}

atualizarExecucao().catch(error => {
    console.error(error);
    process.exitCode = 1;
});