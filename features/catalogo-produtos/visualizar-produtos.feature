@AQ-9
@AQ-REQ-5
@ui
Feature: Visualizar produtos
    Como visitante
    Quero visualizar a lista de produtos disponíveis
    Para conhecer os produtos oferecidos pela loja

    @AQ-TC-47
    Scenario: Acessar a página de produtos
    Given que o visitante esteja na página inicial
    When acessar a página de produtos
    Then o sistema deve apresentar a página de produtos

    @AQ-TC-48
    Scenario: Visualizar a lista de produtos disponíveis
    Given que o visitante esteja na página de produtos
    Then o sistema deve apresentar a lista de produtos disponíveis

    @AQ-TC-49
    Scenario: Verificar as informações apresentadas nos produtos
    Given que o visitante esteja na página de produtos
    Then cada produto apresentado deve conter um nome
    And cada produto apresentado deve conter um preço
    And cada produto apresentado deve conter uma imagem

    @AQ-TC-50
    Scenario: Visualizar a opção de detalhes de um produto
    Given que o visitante esteja na página de produtos
    When visualizar um produto disponível
    Then o sistema deve apresentar a opção de visualizar os detalhes do produto

    @AQ-TC-51
    Scenario: Acessar os detalhes de um produto
    Given que o visitante esteja na página de produtos
    When selecionar a opção de visualizar os detalhes de um produto
    Then o sistema deve apresentar a página de detalhes do produto selecionado
    And as informações apresentadas devem corresponder ao produto selecionado
