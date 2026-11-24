@AQ-12
@AQ-REQ-8
@ui
Feature: Avaliar produtos
    Como visitante
    Quero enviar uma avaliação sobre um produto
    Para compartilhar minha opinião com outros usuários

    @AQ-TC-59
    Scenario: Visualizar formulário de avaliação do produto
    Given que o visitante esteja na página de produtos
    When acessar os detalhes de um produto
    Then o sistema deve apresentar a seção "Write Your Review"
    And deve disponibilizar os campos de nome, e-mail e avaliação

    @AQ-TC-60
    Scenario: Enviar avaliação com dados válidos
    Given que o visitante esteja na página de detalhes de um produto
    And o formulário "Write Your Review" esteja disponível
    When informar um nome válido
    And informar um endereço de e-mail válido
    And preencher o campo de avaliação
    And clicar no botão "Submit"
    Then o sistema deve apresentar a mensagem "Thank you for your review."
