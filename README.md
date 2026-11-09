# Armazenamento de Relatórios

Esta branch armazena os relatórios HTML gerados pelo pipeline de CI/CD do GitHub Actions, mantendo os artefatos de execução separados do código-fonte.

## Organização dos relatórios

Os relatórios são organizados de acordo com o tipo de execução:

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

Cada diretório corresponde a uma categoria de execução:

- **Smoke-tests:** testes Smoke executados automaticamente a cada push na branch `main` ou por execução manual.
- **All-tests:** execução de todos os testes automatizados, independentemente das tags.
- **Epic:** execução de todos os testes pertencentes à Epic `conta-autenticacao`.
- **AQ-2:** execução dos testes de UI da User Story AQ-2.
- **AQ-2/API:** execução dos testes de API da User Story AQ-2.
- **AQ-3, AQ-4 e AQ-5:** diretórios previstos para os relatórios das respectivas User Stories.

## Relatórios publicados

Os relatórios HTML podem ser acessados diretamente pelo GitHub Pages:

| Categoria de execução | Relatório |
|---|---|
| Todos os testes | [Visualizar relatório](https://fgassi.github.io/QA-Testing/reports/All-tests/index.html) |
| Testes Smoke | [Visualizar relatório](https://fgassi.github.io/QA-Testing/reports/Smoke-tests/index.html) |
| Epic — Conta e autenticação | [Visualizar relatório](https://fgassi.github.io/QA-Testing/reports/conta-autenticacao/Epic/index.html) |
| AQ-2 — Testes de UI | [Visualizar relatório](https://fgassi.github.io/QA-Testing/reports/conta-autenticacao/AQ-2/index.html) |
| AQ-2 — Testes de API | [Visualizar relatório](https://fgassi.github.io/QA-Testing/reports/conta-autenticacao/AQ-2/API/index.html) |

## Atualização dos relatórios

Após cada execução do workflow, o relatório HTML correspondente à seleção realizada é atualizado automaticamente.

Somente o relatório da categoria executada é substituído. Os relatórios das demais categorias são preservados, mantendo disponível o resultado mais recente de cada tipo de execução.

Mesmo quando algum teste falha, o workflow está configurado para gerar e publicar o relatório da execução, permitindo consultar os resultados e as evidências.

## Publicação

Os relatórios são publicados pelo GitHub Pages e podem ser acessados diretamente pelo navegador.

Esta branch é utilizada exclusivamente para armazenar os relatórios HTML, mantendo os artefatos gerados independentes do código-fonte.