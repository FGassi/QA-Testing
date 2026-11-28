import { test, expect } from '../../../fixtures/test-fixture';
import { HomePage } from '../../../pages/home-tela.page'; 
import { TelaProdutos } from '../../../pages/produtos-tela.page';

let homePage:HomePage;
let produtosPage: TelaProdutos;

test('@AQ-TC-47: Acessar a página de produtos', {
        tag: ['@smoke','@regression'],
    }, async ({ page }) => {
        produtosPage = new TelaProdutos(page);
        homePage = new HomePage(page);

       await test.step('Given que o visitante esteja na página inicial', async () => {
        await homePage.acessarPagina();
       });

       await test.step('When acessar a página de produtos', async () => {
            await homePage.menu.acessarTelaProdutos();
        });

        await test.step('Then o sistema deve apresentar a página de produtos', async () => {
            await expect(produtosPage.titulo).toBeVisible();
        });

    });


test.describe('Quando usuário está presente na página de produtos', {tag: ['@ui']} ,() => {
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        produtosPage = new TelaProdutos(page);

        await test.step('Given que o visitante esteja na página de produtos', async () => {
            await produtosPage.acessarPagina();
        });
    });

    test('@AQ-TC-48: Visualizar a lista de produtos disponíveis', {
        tag: ['@regression'],
    }, async ({ page }) => {

       await test.step('Then o sistema deve apresentar a lista de produtos disponíveis', async () => {
        await expect(produtosPage.listaProdutos).toBeVisible();
       });

    });

    test('@AQ-TC-49: Verificar as informações apresentadas nos produtos', {
    tag: ['@regression'],
    }, async ({ page }) => {

        const quantidadeProdutos = await produtosPage.produtos.count();
       
        for (let i = 0; i < quantidadeProdutos; i++) {
            const produto = produtosPage.produtos.nth(i);

            await test.step('Then cada produto apresentado deve conter um nome', async () => {
                const nome = produto.locator('p').first();;
                await expect(nome).toBeVisible();
                await expect(nome).not.toBeEmpty();
            });

            await test.step('And cada produto apresentado deve conter um preço', async () => {
                const preco = produto.locator('.productinfo h2');
                await expect(preco).toBeVisible();
                await expect(preco).not.toBeEmpty();
            });

            await test.step('And cada produto apresentado deve conter uma imagem', async () => {
                const imagem = produto.locator('img');
                await expect(imagem).toBeVisible();
                await expect(imagem).toHaveAttribute('src', /.+/);
            });
        }

    });

    test('@AQ-TC-50: Visualizar a opção de detalhes de um produto', {
    tag: ['@regression'],
    }, async ({ page }) => {

       await test.step('When visualizar um produto disponível', async () => {
            await expect(produtosPage.viewProduct).toBeVisible();
       });

       await test.step('Then o sistema deve apresentar a opção de visualizar os detalhes do produto', async () => {
            await produtosPage.visualizarProduto();

            console.log('Quantidade de links View Product:', await produtosPage.viewProduct.count());
            await expect(produtosPage.availability).toBeVisible();
       });

    });

    test('@AQ-TC-51: Acessar os detalhes de um produto', {
    tag: ['@regression'],
    }, async ({ page }) => {

        //obtenção do texto
        const produto = produtosPage.produtos.first();

        const nome = await produto.locator('.productinfo p').innerText();
        const preco = await produto.locator('.productinfo h2').innerText();
        
       await test.step('When selecionar a opção de visualizar os detalhes de um produto', async () => {
            await produtosPage.visualizarProduto();
       });

       await test.step('Then o sistema deve apresentar a página de detalhes do produto selecionado', async () => {
            await expect(produtosPage.availability).toBeVisible();
            await expect(produtosPage.condition).toBeVisible();
            await expect(produtosPage.brand).toBeVisible();
       });

       await test.step('And as informações apresentadas devem corresponder ao produto selecionado', async () => {
            await expect(produtosPage.nomeProduto).toHaveText(nome);
            await expect(produtosPage.precoProduto).toHaveText(preco);
       });

    });

});