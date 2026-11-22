import { test, expect, APIResponse } from '@playwright/test';
import {emailGerado, criarParametrosObrigatorios, usuarioValido, usuarioInvalido} from '../../../test-data/usuarios';

test.describe('Deletar conta usuários - API', {
    tag: ['@api']}, () => {
        
    test('@AQ-TC-32: Deletar conta com credenciais válidas', {
        tag: ['@smoke','@regression']}, async ({ request }) => {
        
        let responseCreate: APIResponse;
        let responseDelete: APIResponse;
        let responseBody: any;

        const usuarioDados = criarParametrosObrigatorios();

        await test.step('Given que existe um usuário cadastrado', async () => {
            responseCreate = await request.post('https://automationexercise.com/api/createAccount', {
            //criacao do objeto com os parametros da requisicao
                form: usuarioDados
            });
            responseBody = await responseCreate.json();
            expect(responseBody.responseCode).toBe(201);
            expect(responseBody.message).toBe("User created!");
        });

        await test.step('When enviar uma requisição DELETE para "/api/deleteAccount" com e-mail e senha cadastrados', async () => {
            responseDelete = await request.delete('https://automationexercise.com/api/deleteAccount', {
                form: {
                    email: usuarioDados.email,
                    password: usuarioDados.password
                }
            });
            responseBody = await responseDelete.json();
        });

        await test.step('Then a resposta deve ter status HTTP 200', async () => {
            expect(responseDelete.status()).toBe(200);
        });

        await test.step('And o responseCode deve ser 200', async () => {
            expect(responseBody.responseCode).toBe(200);
        });

        await test.step('And a mensagem deve ser "Account deleted!"', async () => {
            expect(responseBody.message).toBe("Account deleted!");
        });
        
    });

    test('@AQ-TC-35: Tentativa de deletar conta inexistente', {
        tag: ['@regression']}, async ({ request }) => {
        
        let responseDelete: APIResponse;
        let responseBody: any;

        await test.step('Given que não existe um usuário cadastrado com as credenciais informadas', async () => {
        });

        await test.step('When enviar uma requisição DELETE para "/api/deleteAccount" com e-mail e senha inexistentes', async () => {
            responseDelete = await request.delete('https://automationexercise.com/api/deleteAccount', {
                form: {
                    email: usuarioInvalido.email,
                    password: usuarioInvalido.password
                }
            });
        });

        await test.step('Then a resposta deve ter status HTTP 200', async () => {
            expect(responseDelete.status()).toBe(200);
        });

        await test.step('And o responseCode deve ser 404', async () => {
            responseBody = await responseDelete.json();
            expect(responseBody.responseCode).toBe(404);
        });

        await test.step('And a mensagem deve ser Account not found!', async () => {
            expect(responseBody.message).toBe("Account not found!");
        });
    });

    test('@AQ-TC-37: Verificar que a conta foi excluída', {
        tag: ['@smoke','@regression']}, async ({ request }) => {

        let responseCreate: APIResponse;
        let responseDelete: APIResponse;
        let responseVerify: APIResponse;
        let responseBody: any;

        const usuarioDados = criarParametrosObrigatorios();

        await test.step('Given que existe um usuário cadastrado', async () => {
            responseCreate = await request.post('https://automationexercise.com/api/createAccount', {
            //criacao do objeto com os parametros da requisicao
                form: usuarioDados
            });
            responseBody = await responseCreate.json();
            expect(responseBody.responseCode).toBe(201);
            expect(responseBody.message).toBe("User created!");
        });

        await test.step('When enviar uma requisição DELETE para "/api/deleteAccount" com e-mail e senha cadastrados', async () => {
            responseDelete = await request.delete('https://automationexercise.com/api/deleteAccount', {
                form: {
                    email: usuarioDados.email,
                    password: usuarioDados.password
                }
            });
            responseBody = await responseDelete.json();
        });

        await test.step('Then a conta deve ser excluída', async () => {
            expect(responseDelete.status()).toBe(200);
            expect(responseBody.responseCode).toBe(200);
            expect(responseBody.message).toBe("Account deleted!");
        });

        await test.step('And enviar uma requisição POST para "/api/verifyLogin" com as mesmas credenciais', async () => {
            responseVerify = await request.post('https://automationexercise.com/api/verifyLogin', {
                form: {
                    email: usuarioDados.email,
                    password: usuarioDados.password
                }
            });
            responseBody = await responseVerify.json();
        });

        await test.step('Then a resposta deve ter status HTTP 200', async () => {
            expect(responseVerify.status()).toBe(200);
        });

        await test.step('And o responseCode deve ser 404', async () => {
            expect(responseBody.responseCode).toBe(404);
        });

        await test.step('And a mensagem deve ser User not found!', async () => {
            expect(responseBody.message).toBe("User not found!");
        });
        
    });

});
