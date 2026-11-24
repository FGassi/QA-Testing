@AQ-11
@AQ-REQ-6
@ui
Feature: Buscar produtos
    Como visitante
    Quero pesquisar produtos pelo nome
    Para localizar rapidamente um produto específico

    @AQ-TC-38
    Scenario: Buscar produto existente pelo nome completo
    Given que o visitante esteja na página de produtos
    When informar o nome completo de um produto existente
    And acionar o botão de pesquisa
    Then o sistema deve apresentar o produto correspondente
    And os resultados devem corresponder ao termo pesquisado

    @AQ-TC-39
    Scenario: Buscar produto utilizando parte do nome
    Given que o visitante esteja na página de produtos
    When informar parte do nome de um produto existente
    And acionar o botão de pesquisa
    Then o sistema deve apresentar os produtos correspondentes ao termo pesquisado

    @AQ-TC-40
    Scenario: Buscar produto inexistente
    Given que o visitante esteja na página de produtos
    When informar o nome de um produto inexistente
    And acionar o botão de pesquisa
    Then o sistema não deve apresentar produtos nos resultados da pesquisa

    @AQ-TC-41
    Scenario: Realizar pesquisa com campo vazio
    Given que o visitante esteja na página de produtos
    When manter o campo de pesquisa vazio
    And acionar o botão de pesquisa
    Then o sistema deve apresentar o comportamento correspondente a uma pesquisa sem termo informado

    @AQ-TC-42
    Scenario: Realizar pesquisa utilizando letras maiúsculas e minúsculas
    Given que o visitante esteja na página de produtos
    When informar o nome de um produto utilizando letras maiúsculas e minúsculas
    And acionar o botão de pesquisa
    Then o sistema deve apresentar os resultados de acordo com o tratamento de letras maiúsculas e minúsculas

    @AQ-TC-43
    Scenario: Realizar uma nova pesquisa após uma pesquisa anterior
    Given que o visitante esteja na página de produtos
    And tenha realizado uma pesquisa anteriormente
    When substituir o termo anterior por outro nome de produto
    And acionar novamente o botão de pesquisa
    Then o sistema deve atualizar os resultados conforme o novo termo pesquisado
    And os resultados anteriores não devem permanecer indevidamente na listagem

    @AQ-TC-44
    Scenario: Buscar produtos utilizando caracteres especiais
    Given que o visitante esteja na página de produtos
    When informar caracteres especiais no campo de pesquisa
    And acionar o botão de pesquisa
    Then o sistema deve processar a pesquisa sem apresentar erros
    And nenhum produto deve ser apresentado quando não houver correspondência