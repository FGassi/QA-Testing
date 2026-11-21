import { test, expect, Page } from '@playwright/test';
import { usuarioValido, usuarioInvalido, emailGerado} from '../../../test-data/usuarios';
import { AutenticacaoPage } from '../../../pages/tela-autenticacao.page';
import { HomePage } from '../../../pages/home-tela.page';
import { Menu } from '../../../components/menu.component'; 
import { TelaProdutos } from '../../../pages/produtos-tela.page';


test.describe('Logout de usuário - UI', {tag: ['@ui']} ,() => {
    
    let telaLogin: AutenticacaoPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        telaLogin = new AutenticacaoPage(page);
        homePage = new HomePage(page);

        await test.step('Given que o usuário possui uma sessão ativa', async () => {
            await homePage.acessarPagina();
            await telaLogin.menu.acessarTelaAutenticacao();
            await telaLogin.preencherCampoEmailLogin(usuarioValido.email);
            await telaLogin.preencherSenhaLogin(usuarioValido.password);
            await telaLogin.clicarLogin();
        });
    });

    test('@AQ-TC-30: Realizar logout na página inicial', {
        tag: ['@smoke','@regression'],
    }, async ({ page }) => {

        const paginaInicial = new HomePage(page);

        await test.step('And está na página inicial', async () => {
            await expect(paginaInicial.titulo).toBeVisible();
        });

        await test.step('When clicar no botão Logout', async () => {
            await paginaInicial.menu.realizarLogout();
        });

        await test.step('Then o sistema deve encerrar a sessão do usuário', async () => {
            await expect(paginaInicial.menu.loginButton).toBeVisible();
        });
       
        await test.step('And redirecioná-lo para a página de login', async () => {
            await expect(telaLogin.botaoLogin).toBeVisible();
        });
    });

    test('@AQ-TC-33: Realizar logout a partir da página de produtos', {
        tag: ['@regression'],
    }, async ({ page }) => {

        const paginaProdutos = new TelaProdutos(page);

        await test.step('And está na página de produtos', async () => {
            await paginaProdutos.menu.acessarTelaProdutos();
        });

        await test.step('When clicar no botão Logout', async () => {
            await paginaProdutos.menu.realizarLogout();
        });

        await test.step('Then o sistema deve encerrar a sessão do usuário', async () => {
            await expect(paginaProdutos.menu.loginButton).toBeVisible();
        });

        await test.step('And redirecioná-lo para a página de login', async () => {
            const telalogin = new AutenticacaoPage(page);
            await expect(telalogin.botaoLogin).toBeVisible();
        });

    });

    test('@AQ-TC-34: Exibir carrinho vazio após logout', {
        tag: ['@smoke','@regression'],
    }, async ({ page }) => {
       
        const paginaProdutos = new TelaProdutos(page);
        
        await test.step('And adicionou produtos ao carrinho', async () => {
            await paginaProdutos.menu.acessarTelaProdutos();
            await paginaProdutos.adicionarProduto();
        });

        await test.step('When realizar Logout', async () => {
            await paginaProdutos.menu.realizarLogout();
        });

        await test.step('And acessar novamente a página do carrinho', async () => {
            await paginaProdutos.menu.acessarTelaCarrinho();
        });

        await test.step('Then o sistema deverá apresentar o carrinho vazio', async () => {
            await expect(paginaProdutos.emptyCart).toBeVisible();
        });

    });

});