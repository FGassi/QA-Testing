@AQ-10
@AQ-REQ-7
@ui
Feature: Filtrar produtos
    Como visitante
    Quero aplicar filtros aos produtos disponíveis
    Para refinar os resultados de acordo com minhas preferências

    @AQ-TC-54
    Scenario: Filtrar produtos por categoria
    Given que o visitante esteja na página de produtos
    When selecionar uma categoria disponível
    Then o sistema deve apresentar os produtos pertencentes à categoria selecionada

    @AQ-TC-55
    Scenario: Filtrar produtos por subcategoria
    Given que o visitante esteja na página de produtos
    And tenha selecionado uma categoria
    When selecionar uma subcategoria disponível
    Then o sistema deve apresentar os produtos pertencentes à subcategoria selecionada

    @AQ-TC-56
    Scenario: Filtrar produtos por marca
    Given que o visitante esteja na página de produtos
    When selecionar uma marca disponível
    Then o sistema deve apresentar os produtos pertencentes à marca selecionada

    @AQ-TC-57
    Scenario: Alterar o filtro de categoria aplicado
    Given que o visitante esteja visualizando produtos de uma categoria
    When selecionar outra categoria disponível
    Then o sistema deve apresentar os produtos correspondentes à nova categoria selecionada

    @AQ-TC-58
    Scenario: Alterar a marca selecionada
    Given que o visitante esteja visualizando produtos de uma marca
    When selecionar outra marca disponível
    Then o sistema deve apresentar os produtos correspondentes à nova marca selecionada