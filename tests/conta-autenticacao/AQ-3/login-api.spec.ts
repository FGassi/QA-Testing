import { test, expect, APIResponse } from '@playwright/test';
import {emailGerado, usuarioValido} from '../../../test-data/usuarios';

test.describe('Login de usuário - API', {
    tag: ['@api']}, () => {
        
    test('@AQ-TC-27: Login com parâmetros e-mail e senha válidos ', {
        tag: ['@smoke','@regression']}, async ({ request }) => {
        
        let response: APIResponse;
        let responseBody: any;

        await test.step('Given que existe um usuário cadastrado', async () => {
        });

        await test.step('When enviar uma requisição POST para "/api/verifyLogin" com e-mail e senha cadastrados', async () => {
            response = await request.post('https://automationexercise.com/api/verifyLogin', {
            //criacao do objeto com os parametros da requisicao
            form: {
                email: usuarioValido.email,
                password: usuarioValido.password
            }
            });
        });

        await test.step('Then a resposta deve ter status HTTP 200', async () => {
            expect(response.status()).toBe(200);
        });

        await test.step('And o responseCode deve ser 200', async () => {
            responseBody = await response.json();
            expect(responseBody.responseCode).toBe(200);
        });

        await test.step('And a mensagem deve ser "User exists!"', async () => {
            expect(responseBody.message).toBe("User exists!");
        });
        
    });

    // Dados do AQ-TC-28
    const casosLoginParametro: {
        form: Record<string, string>; //defino a tipagem da propriedade form, sem isso, as propriedades ausentes seriam undefined. Todo parametro no form é string
        situacao: string;
    }[] = [
        {//objeto 1
            form: { password: usuarioValido.password }, //armazeno numa propriedade form
            situacao: 'sem o parâmetro e-mail'
        },
        {//objeto 2
            form: { email: usuarioValido.email },
            situacao: 'sem o parâmetro senha'
        }
    ];

    for (const caso of casosLoginParametro) {

        test(`@AQ-TC-28: Tentativa de login ${caso.situacao}`, {
            tag: ['@regression']}, async ({ request }) => {
            
            let response: APIResponse;
            let responseBody: any;   

            await test.step('Given que a API de login está disponível', async () => {
            });

            await test.step(`When enviar uma requisição POST para "/api/verifyLogin" ${caso.situacao}`, async () => {
                response = await request.post('https://automationexercise.com/api/verifyLogin', {
                //criacao do objeto com os parametros da requisicao
                form: caso.form //coloca a propriedade form do caso respectivo
            });
            });

            await test.step('Then a resposta deve ter status HTTP 200', async () => {
                expect(response.status()).toBe(200);
            });

            await test.step('And o responseCode deve ser 400', async () => {
                responseBody = await response.json();
                expect(responseBody.responseCode).toBe(400);
            });

            await test.step('And a mensagem deve ser "Bad request, email or password parameter is missing in POST request."', async () => {
                expect(responseBody.message).toBe("Bad request, email or password parameter is missing in POST request.");
            });

        });
    }

    // Dados do AQ-TC-29
    const casosLogin = [
        {
            email: emailGerado(),
            password: 'qualquer valor de senha',
            situacao: 'email não cadastrado e qualquer valor de senha'
        },
        {
            email: usuarioValido.email,
            password: 'senha incorreta',
            situacao: 'email cadastrado e senha incorreta'
        },
        {
            email: '',
            password: 'qualquer valor',
            situacao: 'email vazio e qualquer valor de senha'
        },
        {
            email: usuarioValido.email,
            password: '',
            situacao: 'email cadastrado e senha vazia'
        }
    ];

    for (const caso of casosLogin) {

        test(`@AQ-TC-29: Tentativa de login ${caso.situacao}`, {
        tag: ['@regression']}, async ({ request }) => {
        
        let response: APIResponse;
        let responseBody: any;

        await test.step('Given que a API de login está disponível', async () => {
        });

        await test.step(`When enviar uma requisição POST ${caso.situacao}`, async () => {
            response = await request.post('https://automationexercise.com/api/verifyLogin', {
                form: {
                    email: caso.email,
                    password: caso.password,
                }
            });
        });

        await test.step('Then a resposta deve ter status HTTP 200', async () => {
            expect(response.status()).toBe(200);    
        });

        await test.step('And o responseCode deve ser 404', async () => {
            responseBody = await response.json();
            expect(responseBody.responseCode).toBe(404);
        });

        await test.step('And a mensagem deve ser "User not found!"', async () => {
            expect(responseBody.message).toBe("User not found!");
        });

        });
    }
    
});
