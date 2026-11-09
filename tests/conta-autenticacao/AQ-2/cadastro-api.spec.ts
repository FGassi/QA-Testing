
import { test, expect } from '@playwright/test';
import {emailGerado, criarParametrosObrigatorios, parametrosOpcionais, usuarioValido} from '../../../test-data/usuarios';

test.describe('Cadastro de usuário - API', {
    tag: ['@api']}, () => {
        
    test('@AQ-TC-9: Cadastro bem-sucedido com parâmetros obrigatórios', {
        tag: ['@regression']}, async ({ request }) => {

        const response = await request.post('https://automationexercise.com/api/createAccount', {
            //criacao do objeto com os parametros da requisicao
            form: criarParametrosObrigatorios()
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toBe('User created!');
        
    });

    test('@AQ-TC-10: Cadastro bem-sucedido com todos os parâmetros', {
        tag: ['@smoke','@regression']}, async ({ request }) => {

        const response = await request.post('https://automationexercise.com/api/createAccount', {
            
            form: { //spread ... é spread operator, dados do objeto, quebrando-o
                ...criarParametrosObrigatorios(),
                ...parametrosOpcionais,
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toBe('User created!');
        
    });

    test('@AQ-TC-11: Cadastro sem o parâmetro name', {
    tag: ['@regression']}, async ({ request }) => {
        
        //desestruturação de objetos e spreading, copio o objeto sem o parametro name
        const { name, ...bodyData } = criarParametrosObrigatorios();
        
        const response = await request.post('https://automationexercise.com/api/createAccount', {
                form: bodyData
            }
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toBe(
            'Bad request, name parameter is missing in POST request.'
        );

    });

    //testes 12 ao 21
    //desestruturacao dinamica

    const parametrosAusentes = [
        { caso: 'AQ-TC-12', parametro: 'email' },
        { caso: 'AQ-TC-13', parametro: 'password' },
        { caso: 'AQ-TC-14', parametro: 'firstname' },
        { caso: 'AQ-TC-15', parametro: 'lastname' },
        { caso: 'AQ-TC-16', parametro: 'address1' },
        { caso: 'AQ-TC-17', parametro: 'country' },
        { caso: 'AQ-TC-18', parametro: 'zipcode' },
        { caso: 'AQ-TC-19', parametro: 'state' },
        { caso: 'AQ-TC-20', parametro: 'city' },
        { caso: 'AQ-TC-21', parametro: 'mobile_number' },
    ] as const;

    for (const item of parametrosAusentes) { //declaro item

        test(`@${item.caso}: Cadastro sem o parâmetro ${item.parametro}`, {
        tag: ['@regression']}, async ({ request }) => {

            //desestruturação de objetos e spreading dinamico
            //[item.parametro]: identifica dinamicamente qual propriedade será extraída.
            //valorRemovido: é uma variável que receberá o valor da propriedade extraída.

            const { [item.parametro]:valorRemovido, ...bodyData } = criarParametrosObrigatorios();
            
            const response = await request.post('https://automationexercise.com/api/createAccount', {
                    form: bodyData
                }
            );

            expect(response.status()).toBe(200);

            const responseBody = await response.json();

            expect(responseBody.responseCode).toBe(400);
            expect(responseBody.message).toBe(
                `Bad request, ${item.parametro} parameter is missing in POST request.`
            );

            }
        );

    }

    test('@AQ-TC-22: Tentativa de cadastro com e-mail existente', {
    tag: ['@regression']}, async ({ request }) => {
        
        const bodyData = criarParametrosObrigatorios()

        const requisicaoUm = await request.post('https://automationexercise.com/api/createAccount', {
            //criacao do objeto com os parametros da requisicao
            form: bodyData
        });

        expect(requisicaoUm.status()).toBe(200);

        const requisicaoUmBody = await requisicaoUm.json();

        expect(requisicaoUmBody.responseCode).toBe(201);
        expect(requisicaoUmBody.message).toBe('User created!');

        const requisicaoDois = await request.post('https://automationexercise.com/api/createAccount', {
            //criacao do objeto com os parametros da requisicao
            form: bodyData
        });

        expect(requisicaoDois.status()).toBe(200);

        const requisicaoDoisBody = await requisicaoDois.json();

        expect(requisicaoDoisBody.responseCode).toBe(400);
        expect(requisicaoDoisBody.message).toBe('Email already exists!');

    });

});