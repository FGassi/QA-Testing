import { test, expect, APIResponse } from '@playwright/test';

test.describe('Visualizar produtos - API', {
    tag: ['@api']}, () => {
        
    test('@AQ-TC-52: Consultar a lista de produtos pela API', {
        tag: ['@smoke','@regression']}, async ({ request }) => {
        
        let response: APIResponse;
        let responseBody: any;

            await test.step('Given que a API de produtos esteja disponível', async () => {
            });

            await test.step('When enviar uma requisição GET para "/api/productsList"', async () => {
                    response = await request.get('https://automationexercise.com/api/productsList');
                    responseBody = await response.json();
            });

            await test.step('Then a resposta deve ter status HTTP 200', async () => {
                expect(response.status()).toBe(200);
            });

            await test.step('And o responseCode deve ser 200', async () => {
                expect(responseBody.responseCode).toBe(200);
            });

            await test.step('And o responseBody deve conter a lista de produtos', async () => {
                const produtos = responseBody.products

                expect(produtos).toBeDefined(); //houve retorno?
                expect(Array.isArray(produtos)).toBe(true); //é array?
                expect(produtos.length).toBeGreaterThan(0); //não é vazio

                for (const produto of produtos) {
                    // Todo produto deve ter as seguintes propriedades:
                    expect(produto.id).toBeDefined();
                    expect(produto.name).toBeTruthy();
                    expect(produto.price).toBeTruthy();
                    expect(produto.brand).toBeTruthy();
                    expect(produto.category).toBeDefined();
                    expect(produto.category.usertype).toBeTruthy();
                    expect(produto.category.usertype.usertype).toBeTruthy();
                    expect(produto.category.category).toBeTruthy();
                }
            });
        
    });

    test('@AQ-TC-53: Consultar a lista de produtos utilizando método POST', {
    tag: ['@regression']}, async ({ request }) => {

        let response: APIResponse;
        let responseBody: any;

        await test.step('When enviar uma requisição POST para "/api/productsList"', async () => {
        response = await request.post('https://automationexercise.com/api/productsList');
        responseBody = await response.json();
        });

        await test.step('Then a resposta deve ter status HTTP 200', async () => {
        expect(response.status()).toBe(200);
        });

        await test.step('And o responseCode deve ser 405', async () => {
        expect(responseBody.responseCode).toBe(405);
        });

        await test.step('And a mensagem deve ser "This request method is not supported."', async () => {
        expect(responseBody.message).toBe('This request method is not supported.');
        });

    });

});
