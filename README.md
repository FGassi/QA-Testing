# QA-Testing

Projeto de QA com foco em testes funcionais, gestão de testes, BDD e automação de testes web, utilizando o [Automation Exercise](https://automationexercise.com/) como aplicação sob teste.

O objetivo é demonstrar um fluxo de trabalho de QA, desde a análise de requisitos e o planejamento dos testes até a automação, a execução e a documentação dos resultados.

## Stack

| **Área** | **Ferramentas** |
|---|---|
| Gestão de requisitos e tarefas | Jira |
| Gestão de casos de teste | BesTest |
| Documentação e versionamento | Markdown, Git e GitHub |
| BDD | Gherkin |
| Automação web | Playwright + TypeScript |
| Organização da automação | Page Object Model (POM) |
| CI/CD | GitHub Actions |
| Publicação de relatórios | GitHub Pages |
| Testes de API | Postman (planejado) |

## Processo

1. **Jira:** organização das Epics, User Stories e critérios de aceitação.
2. **BesTest:** criação e gerenciamento de requisitos e casos de teste.
3. **Gherkin:** documentação dos comportamentos esperados em cenários BDD.
4. **Rastreabilidade:** relacionamento entre User Stories, requisitos e casos de teste.
5. **Git e GitHub:** versionamento, organização por branches, commits e Pull Requests.
6. **Playwright:** implementação e execução dos testes automatizados utilizando TypeScript e Page Object Model.
7. **GitHub Actions:** execução automatizada dos testes em pipeline CI/CD.
8. **Relatórios e evidências:** geração de relatórios HTML, armazenamento dos resultados e publicação pelo GitHub Pages.

## Estrutura do repositório

```text
QA-Testing/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   └── epics/
│       └── conta-e-autenticacao/
│           ├── stories.md
│           └── matriz-rastreabilidade.md
├── features/
│   └── cadastro_novo_usuario.feature
├── tests/
│   └── conta-autenticacao/
│       └── AQ-2/
│           └── cadastro.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Escopo de testes

| **Epic** | **Funcionalidade** | **Cenários previstos** | **Automatizado?** | **Status** |
|---|---|---|---|---|
| Conta e autenticação | Cadastrar novo usuário | Campos obrigatórios, formato de e-mail, e-mail existente e cadastro bem-sucedido | Sim, AQ-2 | Em desenvolvimento |

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

O pipeline utiliza GitHub Actions para executar os testes automatizados e publicar os relatórios HTML.

**Execução automática:**
- A cada push na branch `main`, o pipeline executa os testes identificados com a tag `@smoke`.

**Execução manual:**

Pelo GitHub Actions, é possível selecionar:
- Todos os testes.
- Testes Smoke.
- Todos os testes de uma Epic.
- Testes de uma User Story específica.

### Armazenamento e publicação dos relatórios

Os relatórios HTML são armazenados na branch `relatorios`, separada da branch principal para manter os artefatos de execução independentes do código-fonte.

A organização considera o tipo de execução:

- `Smoke-tests`: execução dos testes Smoke.
- `All-tests`: execução de todos os testes.
- `conta-autenticacao/Epic`: execução da Epic.
- `conta-autenticacao/AQ-2`: execução da User Story AQ-2.

Após cada execução, somente o relatório correspondente é atualizado. Os relatórios das demais categorias são preservados.

A publicação é realizada pelo GitHub Pages, permitindo consultar os resultados diretamente pelo navegador.

## Relatórios e evidências

- [Relatório da User Story AQ-2 — Cadastro de novo usuário](https://fgassi.github.io/QA-Testing/reports/conta-autenticacao/AQ-2/)

<sub>Execução em 02/11/2026, nos navegadores Chromium, Firefox e WebKit.</sub>