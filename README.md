# QA-Testing

Projeto de QA com foco em testes funcionais, gestão de testes, BDD e automação de testes web e de API, utilizando o [Automation Exercise](https://automationexercise.com/) como aplicação sob teste.

O objetivo é demonstrar um fluxo de trabalho de QA, desde a análise de requisitos e o planejamento dos testes até a documentação, automação, execução e análise dos resultados.

## Stack

| Área | Ferramentas |
|---|---|
| Gestão de requisitos e tarefas | Jira |
| Gestão de casos de teste | BesTest |
| Documentação e versionamento | Markdown, Git e GitHub |
| BDD | Gherkin |
| Automação de testes web e API | Playwright + TypeScript |
| Testes de API | Postman |
| Organização da automação | Page Object Model (POM) |
| CI/CD | GitHub Actions |
| Publicação de relatórios | GitHub Pages |

## Processo de QA

1. **Jira:** organização de Epics, User Stories e critérios de aceitação.
2. **BesTest:** criação e gerenciamento de requisitos e casos de teste.
3. **Gherkin:** documentação dos comportamentos esperados em cenários BDD.
4. **Rastreabilidade:** relacionamento entre User Stories, requisitos e casos de teste.
5. **Git e GitHub:** versionamento, organização por branches, commits e Pull Requests.
6. **Playwright:** implementação e execução de testes automatizados de UI e API utilizando TypeScript.
7. **GitHub Actions:** execução automatizada dos testes por meio de um pipeline CI/CD.
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
│   ├── cadastro_novo_usuario.feature
│   └── cadastro_novo_usuario-api.spec.ts
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
- Utilização de variáveis de ambiente (`.env` e GitHub Secrets).
- Organização dos testes por tags: `@smoke`, `@regression`, `@ui` e `@api`.

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

**Execução automática**

A cada push na branch `main`, o pipeline executa os testes identificados com a tag `@smoke`.

**Execução manual**

Por meio da opção `workflow_dispatch` do GitHub Actions, é possível selecionar:

- Todos os testes.
- Testes Smoke.
- Todos os testes de uma Epic.
- Testes de uma User Story específica.
- Testes de API da User Story AQ-2.

### Organização das branches

O projeto utiliza três branches com responsabilidades distintas:

- **`main`:** branch principal, que recebe as alterações por meio de Pull Requests. Cada push executa automaticamente os testes Smoke.
- **`dev`:** branch de desenvolvimento e integração das alterações antes de serem enviadas à `main`.
- **`relatorios`:** branch destinada ao armazenamento dos relatórios HTML gerados pelas execuções automatizadas.

### Armazenamento e publicação dos relatórios

Os relatórios HTML são armazenados na branch `relatorios`, separada do código-fonte.

A organização dos diretórios acompanha as opções de execução disponíveis no GitHub Actions:

```text
reports/
├── Smoke-tests/
├── All-tests/
└── conta-autenticacao/
    ├── Epic/
    ├── AQ-2/
    │   └── API/
    ├── AQ-3/
    ├── AQ-4/
    └── AQ-5/
```

Cada execução atualiza o relatório correspondente à seleção realizada, preservando os relatórios das demais categorias.