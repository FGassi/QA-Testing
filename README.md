# Armazenamento de Relatórios

Esta branch armazena os relatórios HTML gerados pelo pipeline de CI/CD do GitHub Actions.

## Organização dos relatórios

Os relatórios são separados de acordo com o tipo de execução:

```text
reports/
├── Smoke-tests/
├── All-tests/
└── conta-autenticacao/
    ├── Epic/
    ├── AQ-2/
    ├── AQ-3/
    ├── AQ-4/
    └── AQ-5/
```

Cada pasta representa uma categoria de execução:

- **Smoke-tests:** testes de fumaça executados automaticamente a cada push na branch `main` ou por execução manual.
- **All-tests:** execução de todos os testes automatizados.
- **Epic:** execução de todos os testes pertencentes à Epic `conta-autenticacao`.
- **AQ-2 a AQ-5:** execução dos testes correspondentes a cada User Story da Epic.

## Atualização dos relatórios

Após cada execução do workflow, o relatório HTML correspondente é atualizado automaticamente.

Somente o relatório mais recente de cada categoria é mantido. As demais categorias permanecem inalteradas, evitando a perda de relatórios de execuções anteriores.

Esta branch é utilizada exclusivamente para armazenar os relatórios, mantendo os artefatos gerados separados do código-fonte na branch `main`.