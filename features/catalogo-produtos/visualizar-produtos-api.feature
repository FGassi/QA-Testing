@AQ-9
@AQ-REQ-5
@api
Feature: Visualizar produtos
    Como visitante
    Quero visualizar a lista de produtos disponíveis
    Para conhecer os produtos oferecidos pela loja

    @AQ-TC-52
    Scenario: Consultar a lista de produtos pela API
    Given que a API de produtos esteja disponível
    When enviar uma requisição GET para "/api/productsList"
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 200
    And o responseBody deve conter a lista de produtos

    @AQ-TC-53
    Scenario: Consultar a lista de produtos utilizando método POST
    Given que a API de produtos esteja disponível
    When enviar uma requisição POST para "/api/productsList"
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 405
    And a mensagem deve ser "This request method is not supported."
