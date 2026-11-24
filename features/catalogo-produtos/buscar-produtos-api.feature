@AQ-11
@AQ-REQ-6
@api
Feature: Buscar produtos
    Como visitante
    Quero pesquisar produtos pelo nome
    Para localizar rapidamente um produto específico

    @AQ-TC-45
    Scenario: Buscar produtos com parâmetro válido
    Given que existe um termo de pesquisa válido
    When enviar uma requisição POST para "/api/searchProduct" com o parâmetro "search_product"
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 200
    And o responseBody deve conter a lista de produtos correspondentes à pesquisa

    @AQ-TC-46
    Scenario: Buscar produtos sem informar o parâmetro obrigatório
    Given que não foi informado o parâmetro "search_product"
    When enviar uma requisição POST para "/api/searchProduct" sem parâmetros
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, search_product parameter is missing in POST request."