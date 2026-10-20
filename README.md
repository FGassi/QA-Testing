# QA-Testing

Projeto de QA com foco em testes funcionais, gestão de testes, BDD e automação de testes web, utilizando o [Automation Exercise](https://automationexercise.com/) como aplicação sob teste.

O objetivo é demonstrar um fluxo de trabalho de QA, desde a análise dos requisitos e o planejamento dos testes até a automação, a execução e a documentação dos resultados.

## Stack

| Área | Ferramentas |
|---|---|
| Gestão de requisitos e tarefas | Jira |
| Gestão de casos de teste | BesTest |
| Documentação e versionamento | Markdown, Git e GitHub |
| BDD | Gherkin |
| Automação web | Playwright + TypeScript |
| Organização da automação | Page Object Model (POM) |
| Execução de cenários BDD | Cucumber (integração planejada) |
| Testes de API | Postman (planejado) |
| CI/CD | GitHub Actions (planejado) |

## Processo

1. **Jira:** organização das Epics, User Stories e critérios de aceitação.
2. **BesTest:** criação dos requisitos e casos de teste.
3. **Gherkin:** documentação dos comportamentos esperados em cenários BDD.
4. **Rastreabilidade:** relacionamento entre Stories, requisitos e casos de teste.
5. **Git e GitHub:** branches, commits e Pull Requests para organizar as alterações.
6. **Playwright:** implementação e execução dos testes automatizados.
7. **GitHub Actions:** execução automatizada dos testes em pipeline, incluindo grupos como `@smoke` e `@regression`.
8. **Relatórios e evidências:** documentação dos resultados e análise das falhas.

## Estrutura do repositório

```
QA-Testing/
├── epics/
│   └── conta-e-autenticacao/
│       └── docs/
│           ├── stories.md
│           └── matriz-rastreabilidade.md
└── features/
    └── cadastro_novo_usuario.feature
```

A estrutura será ajustada conforme as ferramentas e funcionalidades forem implementadas.

## Escopo de testes

| Epic | Funcionalidade | Cenários previstos | Automatizado? | Status |
|---|---|---|---|---|
| Conta e autenticação | Cadastrar novo usuário | Campos obrigatórios, formato de e-mail, e-mail existente e cadastro bem-sucedido | Não | Em desenvolvimento |

## Como executar

As instruções de instalação e execução serão adicionadas após a configuração do ambiente de automação.

## Relatórios e evidências

Os relatórios e as evidências de execução serão organizados em `docs/reports/`.