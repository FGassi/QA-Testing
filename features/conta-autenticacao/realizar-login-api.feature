@AQ-3
@AQ-REQ-2
@api
Feature: Realizar Login
    Como usuário,
    quero realizar login com e-mail e senha,
    para realizar compras

        @AQ-TC-27
        Scenario: Login com parâmetros e-mail e senha válidos
        Given que existe um usuário cadastrado
        When enviar uma requisição POST para "/api/verifyLogin" com e-mail e senha cadastrados
        Then a resposta deve ter status HTTP 200
        And o responseCode deve ser 200
        And a mensagem deve ser "User exists!"

        @AQ-TC-28
        Scenario Outline: Tentativa de login sem parâmetro obrigatório
        Given que a API de login está disponível
        When enviar uma requisição POST para "/api/verifyLogin" <situacao>
        Then a resposta deve ter status HTTP 200
        And o responseCode deve ser 400
        And a mensagem deve ser "Bad request, email or password parameter is missing in POST request."

        Examples:
            | situacao                |
            | sem o parâmetro e-mail  |
            | sem o parâmetro senha   |

        @AQ-TC-29
        Scenario Outline: Tentativa de login com credenciais inválidas ou campo vazio
        Given que a API de login está disponível
        When enviar uma requisição POST para "/api/verifyLogin" com <email> e <senha> 
        Then a resposta deve ter status HTTP 200
        And o responseCode deve ser 404
        And a mensagem deve ser "User not found!"

        Examples:
            | email               | senha               |
            | não cadastrado      | qualquer valor      |
            | cadastrado          | senha incorreta     |
            | vazio               | qualquer valor      |
            | cadastrado          | vazia               |