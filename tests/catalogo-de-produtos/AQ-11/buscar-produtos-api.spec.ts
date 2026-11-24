import { test, expect, APIResponse } from '@playwright/test';

test.describe('Buscar produtos - API', {
    tag: ['@api']}, () => {
        
    test('@AQ-TC-45: Buscar produtos com parâmetro válido', {
        tag: ['@smoke','@regression']}, async ({ request }) => {
        
        let response: APIResponse;
        let responseBody: any;
        const termosPesquisa = ['top','dress','shirt']; //eu quero testar com mais buscas, provavelmente um for aqui

        for (const termoPesquisa of termosPesquisa) {
            await test.step(`Given que existe um termo de pesquisa válido para "${termoPesquisa}"`, async () => {
            expect(termoPesquisa.trim().length).toBeGreaterThan(0); //existe dados?
        });

            await test.step(`When enviar uma requisição POST para "/api/searchProduct" com o parâmetro "search_product" ${termoPesquisa}`, async () => {
                response = await request.post('https://automationexercise.com/api/searchProduct', {
                    form: {
                        search_product: termoPesquisa,
                    } 
                });
                responseBody = await response.json();
            });

            await test.step('Then a resposta deve ter status HTTP 200', async () => {
                expect(response.status()).toBe(200);
            });

            await test.step('And o responseCode deve ser 200', async () => {
                expect(responseBody.responseCode).toBe(200);
            });

            await test.step('And o responseBody deve conter a lista de produtos com as informações esperadas', async () => {
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

                    //contem o termo pesquisado?
                    expect(
                        produto.name.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
                        produto.category.category.toLowerCase().includes(termoPesquisa.toLowerCase())
                    ).toBe(true);
                }
            });
        }
    });

    test('@AQ-TC-46: Buscar produtos sem informar o parâmetro obrigatório', {
        tag: ['@regression']}, async ({ request }) => {
        
        let response: APIResponse;
        let responseBody: any;

        await test.step('Given que não foi informado o parâmetro "search_product"', async () => {
        });

        await test.step('When enviar uma requisição POST para "/api/searchProduct" sem parâmetros', async () => {
            response = await request.post('https://automationexercise.com/api/searchProduct', {
                form: {
                }
            });
            responseBody = await response.json();
        });

        await test.step('Then a resposta deve ter status HTTP 200', async () => {
            expect(response.status()).toBe(200);
        });

        await test.step('And o responseCode deve ser 400', async () => {
            expect(responseBody.responseCode).toBe(400);
        });

        await test.step('And a mensagem deve ser "Bad request, search_product parameter is missing in POST request."', async () => {
            expect(responseBody.message).toBe("Bad request, search_product parameter is missing in POST request.");
        });
        
    });

});
