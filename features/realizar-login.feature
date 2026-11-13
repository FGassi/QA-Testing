@AQ-3
@AQ-REQ-2
@ui
Feature: Realizar Login
  Como usuário,
  quero realizar login com e-mail e senha,
  para realizar compras

    @AQ-TC-23
    Scenario: Realizar login com dados existentes e corretos
    Given que o usuário se encontra na tela de login
    When o usuário preenche o campo e-mail com um e-mail cadastrado
    And preenche o campo senha corretamente
    And clica no botão Login
    Then o usuário é direcionado para a página inicial

    @AQ-TC-24
    Scenario: Tentativa de login com e-mail não cadastrado
    Given que o usuário se encontra na tela de login
    When o usuário preenche o campo e-mail com um e-mail não cadastrado
    And preenche o campo senha com qualquer valor
    And clica no botão Login
    Then o usuário permanece na tela de login
    And é exibido em tela a mensagem "E-mail ou senha incorreto"

    @AQ-TC-25
    Scenario: Tentativa de login com senha incorreta
    Given que o usuário se encontra na tela de login
    When o usuário preenche o campo e-mail com um e-mail cadastrado
    And preenche o campo senha com uma senha incorreta
    And clica no botão Login
    Then o usuário permanece na tela de login
    And é exibido em tela a mensagem "E-mail ou senha incorreto"

    @AQ-TC-26
    Scenario Outline: Tentativa de login com campo obrigatório vazio
    Given que o usuário se encontra na tela de login
    When o usuário preenche o campo e-mail com <email>
    And preenche o campo senha com <senha>
    And clica no botão Login
    Then os campos vazios são sinalizados como obrigatórios
    And o usuário permanece na tela de login

    Examples:
        | email      | senha      |
        | vazio      | preenchido |
        | preenchido | vazio      |
        | vazio      | vazio      |

