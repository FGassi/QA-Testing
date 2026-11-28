import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../../pages/home-tela.page'; 
import { TelaProdutos } from '../../../pages/produtos-tela.page';
import { usuarioValido } from '../../../test-data/usuarios';

let homePage:HomePage;
let produtosPage: TelaProdutos;

test.describe('Avaliar produtos - UI', {tag: ['@ui']} ,() => {
    
    test('@AQ-TC-59: Acessar a página de produtos', {
            tag: ['@smoke','@regression'],
        }, async ({ page }) => {
            produtosPage = new TelaProdutos(page);
            homePage = new HomePage(page);

        await test.step('Given que o visitante esteja na página de produtos', async () => {
            await produtosPage.acessarPagina();
        });

        await test.step('When acessar os detalhes de um produto', async () => {
            await produtosPage.visualizarProduto();
        });

        await test.step('Then o sistema deve apresentar a seção "Write Your Review"', async () => {
            await expect(produtosPage.writeReview).toBeVisible();
        });

        await test.step('And deve disponibilizar os campos de nome, e-mail e avaliação', async () => {
            await expect(produtosPage.nomeAvaliacao).toBeVisible();
            await expect(produtosPage.emailAvaliacao).toBeVisible();
            await expect(produtosPage.reviewAvaliacao).toBeVisible();
        });

    });

    test('@AQ-TC-60: Enviar avaliação com dados válidos', {
            tag: ['@smoke','@regression'],
        }, async ({ page }) => {
            produtosPage = new TelaProdutos(page);
            homePage = new HomePage(page);

        await test.step('Given que o visitante esteja na página de detalhes de um produto', async () => {
            await produtosPage.acessarPagina();
            await produtosPage.visualizarProduto();
        });

        await test.step('And o formulário "Write Your Review" esteja disponível', async () => {
            await expect(produtosPage.writeReview).toBeVisible();
        });

        await test.step('When informar um nome válido', async () => {
            await produtosPage.inserirNomeAvaliacao(usuarioValido.nome);
        });

        await test.step('And informar um endereço de e-mail válido', async () => {
            await produtosPage.inserirEmailAvaliacao(usuarioValido.email);
        });

        await test.step('And preencher o campo de avaliação', async () => {
            await produtosPage.inserirTextoAvaliacao('Aprendizado Playwright')
        });

        await test.step('And clicar no botão "Submit"', async () => {
            await produtosPage.submeterAvaliacao();
        });
        
        await test.step('Then o sistema deve apresentar a mensagem "Thank you for your review."', async () => {
            await expect(produtosPage.confirmacaoAvaliacao).toBeVisible();
        });
    });

});