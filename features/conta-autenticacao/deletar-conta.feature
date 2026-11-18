@AQ-5
@AQ-REQ-4
@ui
Feature: Deletar conta
  Como usuário,
  quero excluir minha conta,
  para remover meu cadastro na plataforma

    @AQ-TC-31
    Scenario: Excluir conta com usuário autenticado
    Given que existe um usuário cadastrado e autenticado
    When acessar a opção Delete Account
    Then o sistema deve excluir a conta do usuário
    And exibir uma mensagem de confirmação da exclusão

    @AQ-TC-36  
    Scenario: Impedir login após exclusão da conta
    Given que o usuário possui uma conta excluída
    When tentar realizar login com suas credenciais anteriores
    Then o sistema não deve permitir a autenticação