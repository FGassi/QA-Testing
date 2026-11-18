@AQ-2
@AQ-REQ-1
@api
Feature: Cadastrar novo usuário
  Como visitante
  Quero cadastrar uma conta
  Para poder realizar compras

    @AQ-TC-9
    Scenario: Cadastro bem-sucedido com parâmetros obrigatórios
    Given que existem dados válidos para um novo usuário
    When enviar uma requisição POST para "/api/createAccount" com todos os parâmetros obrigatórios
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 201
    And a mensagem deve ser "User created!"

    @AQ-TC-10
    Scenario: Cadastro bem-sucedido com todos os parâmetros
    Given que existem dados válidos para um novo usuário
    When enviar uma requisição POST para "/api/createAccount" com todos os parâmetros obrigatórios e opcionais
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 201
    And a mensagem deve ser "User created!"

    @AQ-TC-11
    Scenario: Cadastro sem o parâmetro name
    Given que existem dados válidos para um novo usuário exceto pelo parâmetro name
    When enviar uma requisição POST para "/api/createAccount" sem o parâmetro name
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, name parameter is missing in POST request."

    @AQ-TC-12
    Scenario: Cadastro sem o parâmetro email
    Given que existem dados válidos para um novo usuário exceto pelo parâmetro email
    When enviar uma requisição POST para "/api/createAccount" sem o parâmetro email
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, email parameter is missing in POST request."

    @AQ-TC-13
    Scenario: Cadastro sem o parâmetro password
    Given que existem dados válidos para um novo usuário exceto pelo parâmetro password
    When enviar uma requisição POST para "/api/createAccount" sem o parâmetro password
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, password parameter is missing in POST request."

    @AQ-TC-14
    Scenario: Cadastro sem o parâmetro firstname
    Given que existem dados válidos para um novo usuário exceto pelo parâmetro firstname
    When enviar uma requisição POST para "/api/createAccount" sem o parâmetro firstname
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, firstname parameter is missing in POST request."

    @AQ-TC-15
    Scenario: Cadastro sem o parâmetro lastname
    Given que existem dados válidos para um novo usuário exceto pelo parâmetro lastname
    When enviar uma requisição POST para "/api/createAccount" sem o parâmetro lastname
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, lastname parameter is missing in POST request."

    @AQ-TC-16
    Scenario: Cadastro sem o parâmetro address1
    Given que existem dados válidos para um novo usuário exceto pelo parâmetro address1
    When enviar uma requisição POST para "/api/createAccount" sem o parâmetro address1
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, address1 parameter is missing in POST request."
    
    @AQ-TC-17
    Scenario: Cadastro sem o parâmetro country
    Given que existem dados válidos para um novo usuário exceto pelo parâmetro country
    When enviar uma requisição POST para "/api/createAccount" sem o parâmetro country
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, country parameter is missing in POST request."
    
    @AQ-TC-18
    Scenario: Cadastro sem o parâmetro zipcode
    Given que existem dados válidos para um novo usuário exceto pelo parâmetro zipcode
    When enviar uma requisição POST para "/api/createAccount" sem o parâmetro zipcode
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, zipcode parameter is missing in POST request."
    
    @AQ-TC-19
    Scenario: Cadastro sem o parâmetro state
    Given que existem dados válidos para um novo usuário exceto pelo parâmetro state
    When enviar uma requisição POST para "/api/createAccount" sem o parâmetro state
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, state parameter is missing in POST request."
    
    @AQ-TC-20
    Scenario: Cadastro sem o parâmetro city
    Given que existem dados válidos para um novo usuário exceto pelo parâmetro city
    When enviar uma requisição POST para "/api/createAccount" sem o parâmetro city
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, city parameter is missing in POST request."
    
    @AQ-TC-21
    Scenario: Cadastro sem o parâmetro mobile_number
    Given que existem dados válidos para um novo usuário exceto pelo parâmetro mobile_number
    When enviar uma requisição POST para "/api/createAccount" sem o parâmetro mobile_number
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Bad request, mobile_number parameter is missing in POST request."
    
    @AQ-TC-22
    Scenario: Tentativa de cadastro com e-mail já existente
    Given que existe uma conta cadastrada com um e-mail
    When enviar uma requisição POST para "/api/createAccount" com o parâmetro e-mail apresentando um valor existente
    Then a resposta deve ter status HTTP 200
    And o responseCode deve ser 400
    And a mensagem deve ser "Email already exists!"