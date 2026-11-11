# QA-Testing

Projeto de QA com foco em testes funcionais, gestão de testes, BDD e automação de testes web e de API, utilizando o [Automation Exercise](https://automationexercise.com/) como aplicação sob teste.

O objetivo é demonstrar um fluxo de trabalho de QA, desde a análise de requisitos e o planejamento dos testes até a documentação, automação, execução, integração com ferramentas de gestão de testes e análise dos resultados.

## Stack

| Área | Ferramentas |
|---|---|
| Gestão de requisitos e tarefas | Jira |
| Gestão de casos de teste | BesTest |
| Documentação e versionamento | Markdown, Git e GitHub |
| BDD | Gherkin |
| Testes exploratórios de API | Postman |
| Automação de testes de UI e API | Playwright + TypeScript |
| Organização da automação | Page Object Model (POM) |
| Integração com ferramentas externas | Node.js e REST API |
| CI/CD | GitHub Actions |
| Publicação de relatórios | GitHub Pages |

## Processo de QA

1. **Jira:** organização de Epics, User Stories e critérios de aceitação.
2. **BesTest:** criação e gerenciamento de requisitos e casos de teste.
3. **Gherkin:** documentação dos comportamentos esperados em cenários BDD.
4. **Rastreabilidade:** relacionamento entre User Stories, requisitos e casos de teste.
5. **Postman:** exploração de endpoints, envio de requisições e análise de parâmetros, respostas e códigos HTTP.
6. **Git e GitHub:** versionamento, organização por branches, commits e Pull Requests.
7. **Playwright:** implementação e execução de testes automatizados de UI e API utilizando TypeScript.
8. **GitHub Actions:** execução automatizada dos testes por meio de um pipeline CI/CD.
9. **Integração com o BesTest:** sincronização automática dos resultados das execuções automatizadas por meio de sua REST API.
10. **Relatórios e evidências:** geração de relatórios HTML, armazenamento dos resultados e publicação pelo GitHub Pages.

## Estrutura do repositório

```text
QA-Testing/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── .postman/
│   └── resources.yaml
├── docs/
│   ├── epics/
│   │   └── conta-e-autenticacao/
│   │       ├── stories.md
│   │       └── matriz-rastreabilidade.md
│   └── reports/
│       └── conta-autenticacao/
│           └── AQ-2/
├── features/
│   └── cadastrar_novo_usuario.feature
├── scripts/
│   └── sincronizar-bestest.js
├── tests/
│   └── conta-autenticacao/
│       └── AQ-2/
│           ├── cadastro.spec.ts
│           └── cadastro-api.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Escopo de testes

| Epic | Funcionalidade | Cobertura | Automação | Status |
|---|---|---|---|---|
| Conta e autenticação | Cadastro de novo usuário | Validação de campos, formato de e-mail, e-mail existente e cadastro bem-sucedido | UI e API — AQ-2 | Concluída |

## Técnicas aplicadas na automação

- Page Object Model (POM).
- Organização de dados com objetos e arrays de objetos.
- Desestruturação de objetos e spread operator.
- Computed property names (propriedades dinâmicas).
- Testes parametrizados com Playwright.
- Utilização de variáveis de ambiente (`.env`) e GitHub Secrets.
- Organização dos testes por tags: `@smoke`, `@regression`, `@ui` e `@api`.
- Utilização de seletores e estratégias de interação para automação de interfaces web.
- Validação de respostas HTTP e dados retornados pela API.

## Automação e execução

Os testes automatizados são desenvolvidos com Playwright e TypeScript.

A execução pode ser realizada localmente ou por meio do GitHub Actions.

### Execução local

Instale as dependências:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

Execute todos os testes:

```bash
npx playwright test
```

Execute apenas os testes Smoke:

```bash
npx playwright test --grep "@smoke"
```

### Pipeline CI/CD

O pipeline utiliza GitHub Actions para executar os testes automatizados, sincronizar os resultados com o BesTest e publicar os relatórios HTML.

**Execução automática**

A cada push na branch `main`, o pipeline executa os testes identificados com a tag `@smoke`.

**Execução manual**

Por meio da opção `workflow_dispatch` do GitHub Actions, é possível selecionar:

- Todos os testes.
- Testes Smoke.
- Todos os testes de uma Epic.
- Testes de uma User Story específica.
- Testes de API da User Story AQ-2.

### Integração com o BesTest

O projeto possui um script em Node.js responsável por sincronizar os resultados das execuções do Playwright com os casos de teste cadastrados no BesTest.

O processo funciona da seguinte maneira:

1. O Playwright executa os testes e gera um relatório JSON com os resultados das execuções.
2. O script `sincronizar-bestest.js` lê esse arquivo e identifica os casos de teste por meio dos identificadores presentes nos títulos dos testes, como `AQ-TC-1` e `AQ-TC-9`.
3. Os resultados de UI são consolidados considerando as execuções nos navegadores Chromium, Firefox e WebKit, evitando atualizações duplicadas do mesmo caso de teste.
4. Os resultados são associados às respectivas execuções no BesTest, considerando o tipo de teste e o ciclo correspondente.
5. O script consulta a REST API do BesTest para localizar a execução e atualizar seu resultado e comentários.

A consolidação dos resultados considera as seguintes regras:

| Condição das execuções | Resultado sincronizado |
|---|---|
| Pelo menos uma execução falhou | FAILED |
| Todas as execuções passaram | PASSED |
| Todas as execuções foram ignoradas | SKIPPED |
| Combinação de execuções aprovadas e ignoradas | BLOCKED |

A comunicação com o BesTest utiliza autenticação por token Bearer. Para atualizar os registros, o script utiliza o método HTTP `PATCH` e o cabeçalho `If-Match`, com o ETag obtido previamente por meio de uma requisição `GET`. Esse mecanismo permite verificar a versão do recurso antes da atualização.

O script também verifica se o resultado já está atualizado no BesTest, evitando requisições desnecessárias.

**Gerenciamento de credenciais**

- Localmente, o token de autenticação é armazenado na variável `BESTEST_API_TOKEN`, em um arquivo `.env` excluído do versionamento pelo `.gitignore`.
- No GitHub Actions, o token é disponibilizado por meio de um GitHub Secret, evitando sua exposição no código-fonte.
- Os dados utilizados pelos testes automatizados são armazenados em GitHub Environment Secrets.

**Tratamento de falhas**

A etapa de sincronização é executada mesmo quando há falhas nos testes, permitindo registrar os resultados no BesTest. Ao final do pipeline, uma falha na execução dos testes continua sendo sinalizada como falha no workflow.

### Relatórios e evidências

O Playwright gera relatórios HTML e JSON durante a execução.

- **HTML:** permite visualizar os resultados, detalhes das execuções, falhas e evidências dos testes.
- **JSON:** fornece os dados estruturados utilizados pelo script de sincronização com o BesTest.
- **GitHub Pages:** disponibiliza os relatórios HTML publicados para consulta.

Os relatórios são armazenados na branch `relatorios`, separadamente do código-fonte, e publicados pelo GitHub Pages no diretório correspondente à Epic e à User Story.

### Organização das branches

O projeto utiliza três branches com responsabilidades distintas:

- **`main`:** branch principal, que recebe as alterações por meio de Pull Requests. Cada push executa automaticamente os testes Smoke.
- **`dev`:** branch de desenvolvimento e integração das alterações antes de serem enviadas à `main`.
- **`relatorios`:** branch destinada exclusivamente ao armazenamento dos relatórios gerados pelo Playwright após as execuções no GitHub Actions. Mantém os artefatos separados do código-fonte do projeto.