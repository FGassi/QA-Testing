import { test, expect, Page } from '@playwright/test';
import { usuarioValido, usuarioInvalido, emailGerado} from '../../../test-data/usuarios';
import { AutenticacaoPage } from '../../../pages/tela-autenticacao.page';
import { HomePage } from '../../../pages/home-tela.page';
import { Menu } from '../../../components/menu.component'; 
import { SegundaTelaCadastro } from '../../../pages/segunda-tela-cadastro.page';
import { TelaConfirmacao } from '../../../pages/tela-confirmacao.page';

test.describe('Deletar conta de usuário - UI', {tag: ['@ui']} ,() => {
    
    let telaLogin: AutenticacaoPage;
    let homePage: HomePage;
    let segundaTelaCadastro: SegundaTelaCadastro;
    let menu: Menu;
    let telaConfirmacao: TelaConfirmacao;

    test('@AQ-TC-31: Excluir conta com usuário autenticado', {
        tag: ['@smoke','@regression'],
    }, async ({ page }) => {

        const emailUsuario = emailGerado();
        homePage = new HomePage(page);
        segundaTelaCadastro = new SegundaTelaCadastro(page);
        menu = new Menu(page);
        telaConfirmacao = new TelaConfirmacao(page);

        await test.step('Given que existe um usuário cadastrado e autenticado', async () => {
            //acessar tela cadastro e realizar cadastro
            await segundaTelaCadastro.acessarSegundaTela(emailUsuario);
            await segundaTelaCadastro.preencherCamposObrigatorios();
            await segundaTelaCadastro.clicarCriarConta();
            //acessar homepage autenticado
            await homePage.acessarPagina();
 
        });

        await test.step('When acessar a opção Delete Account', async () => {
            await menu.deletarConta();
        });

        await test.step('Then o sistema deve excluir a conta do usuário', async () => {
        });
       
        await test.step('And exibir uma mensagem de confirmação da exclusão', async () => {

            await expect(telaConfirmacao.textoConfirmacaoDeletar).toBeVisible();
        });
    });

    test('@AQ-TC-36: Impedir login após exclusão da conta', {
        tag: ['@regression'],
    }, async ({ page }) => {
        
        const emailUsuario = emailGerado();
        homePage = new HomePage(page);
        segundaTelaCadastro = new SegundaTelaCadastro(page);
        menu = new Menu(page);
        telaLogin = new AutenticacaoPage(page);

        await test.step('Given que o usuário possui uma conta excluída', async () => {
            //acessar tela cadastro e realizar cadastro
            await segundaTelaCadastro.acessarSegundaTela(emailUsuario);
            await segundaTelaCadastro.preencherCamposObrigatorios();
            await segundaTelaCadastro.clicarCriarConta();
            //acessar homepage autenticado
            await homePage.acessarPagina();
            await menu.deletarConta();
        });

        await test.step('When tentar realizar login com suas credenciais anteriores', async () => {
            await menu.acessarTelaAutenticacao();
            await telaLogin.preencherCampoEmailLogin(emailUsuario);
            await telaLogin.preencherSenhaLogin(usuarioValido.password);
            await telaLogin.clicarLogin();
        });

        await test.step('Then o sistema não deve permitir a autenticação', async () => {
            await expect(telaLogin.textoLoginIncorreto).toBeVisible();
        });

    });

});