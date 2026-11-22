@AQ-5
@AQ-REQ-4
@api
Feature: Deletar conta
  Como usuário,
  quero excluir minha conta,
  para remover meu cadastro na plataforma

    @AQ-TC-32
    Scenario: Deletar conta com credenciais válidas
    Given que existe um usuário cadastrado
    When enviar uma requisição DELETE para "/api/deleteAccount" com e-mail e senha cadastrados
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 200
    And a mensagem deve ser "Account deleted!"

    @AQ-TC-35
    Scenario: Tentativa de deletar conta inexistente
    Given que não existe um usuário cadastrado com as credenciais informadas
    When enviar uma requisição DELETE para "/api/deleteAccount" com e-mail e senha inexistentes
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 404
    And a mensagem deve ser Account not found!

    @AQ-TC-37
    Scenario: Verificar exclusão de conta
    Given que existe um usuário cadastrado
    When enviar uma requisição DELETE para "/api/deleteAccount" com e-mail e senha cadastrados
    Then a conta deve ser excluída
    And enviar uma requisição POST para "/api/verifyLogin" com as mesmas credenciais
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 404
    And a mensagem deve ser Account not found!