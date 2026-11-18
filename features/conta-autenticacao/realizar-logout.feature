@AQ-4
@AQ-REQ-3
@ui
Feature: Realizar Logout
  Como usuário,
  quero realizar logout,
  para encerrar minha sessão

    @AQ-TC-30
    Scenario: Realizar logout na página inicial
    Given que o usuário possui uma sessão ativa
    And está na página inicial
    When clicar no botão Logout
    Then o sistema deve encerrar a sessão do usuário
    And redirecioná-lo para a página de login

    @AQ-TC-33
    Scenario: Realizar logout a partir da página de produtos
    Given que o usuário possui uma sessão ativa
    And está na página de produtos
    When clicar no botão Logout
    Then o sistema deve encerrar a sessão do usuário
    And redirecioná-lo para a página de login

    @AQ-TC-34
    Scenario: Exibir carrinho vazio após logout
    Given que o usuário possui uma sessão ativa
    And adicionou produtos ao carrinho
    When realizar Logout
    And acessar novamente a página do carrinho
    Then o sistema deverá apresentar o carrinho vazio