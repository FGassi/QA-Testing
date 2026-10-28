@AQ-2
@AQ-REQ-1
Feature: Cadastrar novo usuário
  Como visitante
  Quero cadastrar uma conta
  Para poder realizar compras

@AQ-TC-1
Scenario: Cadastro com campo e-mail vazio na primeira tela de cadastro
Given que o visitante se encontra na primeira tela de cadastro
When o visitante preenche o campo nome
And deixa o campo email vazio
And clica no botão de cadastrar
Then o visitante permanece na primeira tela de cadastro
And o campo e-mail é sinalizado como obrigatório

@AQ-TC-3
Scenario: Cadastro com campo nome vazio na primeira tela de cadastro
Given que o visitante se encontra na primeira tela de cadastro
When o visitante preenche o campo email com um endereço válido e ainda não cadastrado
And deixa o campo nome vazio
And clica no botão de cadastrar
Then o visitante permanece na primeira tela de cadastro
And o campo nome é sinalizado como obrigatório

@AQ-TC-4
Scenario: Cadastro com formatação de e-mail incorreta na primeira tela de cadastro
Given que o visitante se encontra na primeira tela de cadastro
When o visitante preenche o campo email sem @
And preenche o campo nome
And clica no botão de cadastrar 
Then o visitante permanece na primeira tela de cadastro 
And o visitante é avisado de que o formato do e-mail é inválido

@AQ-TC-5
Scenario: Cadastro com e-mail existente
Given que existe um usuário cadastrado com um e-mail
And que o visitante se encontra na primeira tela de cadastro
When o visitante preenche o campo obrigatório Nome
And preenche o campo e-mail com o e-mail do usuário cadastrado
And clica no botão de cadastrar
Then o visitante permanece na primeira tela de cadastro  
And o sistema avisa que o endereço de e-mail já existe

@AQ-TC-6
Scenario: Cadastro com campos obrigatórios vazios na segunda tela de cadastro
Given que o visitante se encontra na segunda tela de cadastro
When o visitante não preenche os demais campos obrigatórios
And clica no botão "Criar conta" 
Then o visitante permanece na segunda tela de cadastro
And o sistema avisa que os campos obrigatórios devem ser preenchidos 

@AQ-TC-7
Scenario: Cadastro bem sucedido com campos obrigatórios
Given que o visitante se encontra na segunda tela de cadastro
When o visitante preenche os demais campos obrigatórios com dados válidos
And clica no botão "Criar conta" 
Then o sistema direciona o usuário cadastrado para uma tela de confirmação 

@AQ-TC-8
Scenario: Cadastro bem-sucedido com campos obrigatórios e opcionais
Given que o visitante se encontra na segunda tela de cadastro
When When o visitante preenche os demais campos obrigatórios com dados válidos
And preenche os demais campos não obrigatórios 
And clica no botão "Criar conta" 
Then o sistema direciona o usuário cadastrado para uma tela de confirmação 