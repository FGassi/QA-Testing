import { test, expect, Page } from '@playwright/test';
import { usuarioValido, usuarioInvalido, emailGerado} from '../../../test-data/usuarios';
import { AutenticacaoPage } from '../../../pages/tela-autenticacao.page';
import { HomePage } from '../../../pages/home-tela.page'; 


test.describe('Login de usuário - UI', {tag: ['@ui']} ,() => {
    
    let primeiraTela: AutenticacaoPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        primeiraTela = new AutenticacaoPage(page);
        homePage = new HomePage(page);

        await test.step('Given que o usuário se encontra na tela de login', async () => {
          await homePage.acessarPagina();  
          await primeiraTela.menu.acessarTelaAutenticacao();
        });
    });

    test('@AQ-TC-23: Realizar login com dados existentes e corretos', {
        tag: ['@smoke','@regression'],
    }, async ({ page }) => {

       await test.step('When o usuário preenche o campo e-mail com um e-mail cadastrado', async () => {
            await primeiraTela.preencherCampoEmailLogin(usuarioValido.email);
       });

       await test.step('And preenche o campo senha corretamente', async () => {
            await primeiraTela.preencherSenhaLogin(usuarioValido.password);
       });

       await test.step('And clica no botão Login', async () => {
            await primeiraTela.clicarLogin();
       });

       await test.step('Then o usuário é direcionado para a página inicial', async () => {
            const telainicial = new HomePage(page);
            await expect(telainicial.titulo).toBeVisible();
       })
    });

    test('@AQ-TC-24: Tentativa de login com e-mail não cadastrado', {
        tag: ['@regression'],
    }, async ({ page }) => {

       await test.step('When o usuário preenche o campo e-mail com um e-mail não cadastrado', async () => {
            await primeiraTela.preencherCampoEmailLogin(emailGerado());
       });

       await test.step('And preenche o campo senha com qualquer valor', async () => {
            await primeiraTela.preencherSenhaLogin(usuarioValido.password);
       });

       await test.step('And clica no botão Login', async () => {
            await primeiraTela.clicarLogin();
       });

       await test.step('Then o usuário permanece na tela de login', async () => {
            await expect(primeiraTela.textoPrimeiraTela).toBeVisible();
       });

       await test.step('And é exibido em tela a mensagem "E-mail ou senha incorreto"', async () => {
            await expect(primeiraTela.textoLoginIncorreto).toBeVisible();
       });

    });

    test('@AQ-TC-25: Tentativa de login com senha incorreta', {
        tag: ['@regression'],
    }, async ({ page }) => {
       
       await test.step('When o usuário preenche o campo e-mail com um e-mail cadastrado', async () => {
            await primeiraTela.preencherCampoEmailLogin(usuarioValido.email);
       });

       await test.step('And preenche o campo senha com uma senha incorreta', async () => {
            await primeiraTela.preencherSenhaLogin(usuarioInvalido.password);
       });

       await test.step('And clica no botão Login', async () => {
            await primeiraTela.clicarLogin();
       });
       
       
       await test.step('Then o usuário permanece na tela de login', async () => {
            await expect(primeiraTela.textoPrimeiraTela).toBeVisible();
       });

       await test.step('And é exibido em tela a mensagem "E-mail ou senha incorreto"', async () => {
            await expect(primeiraTela.textoLoginIncorreto).toBeVisible();
       });

    });

    // Dados do AQ-TC-26
    const casosLoginVazio = [
        {
            email: '',
            senha: 'senha123',
            descricao: 'e-mail vazio'
        },
        {
            email: 'teste@teste.com',
            senha: '',
            descricao: 'senha vazia'
        },
        {
            email: '',
            senha: '',
            descricao: 'ambos os campos vazios'
        }
    ];

    for (const caso of casosLoginVazio) {

    test(`@AQ-TC-26: Tentativa de login com ${caso.descricao}`, {
        tag: ['@regression'],
    }, async ({ page }) => {

       await test.step(`When o usuário preenche o campo e-mail com ${caso.email}`, async () => {
            await primeiraTela.preencherCampoEmailLogin(caso.email);
       });
       
       await test.step(`And preenche o campo senha com ${caso.senha}`, async () => {
            await primeiraTela.preencherSenhaLogin(caso.senha);
       });
       
       await test.step('And clica no botão Login', async () => {
            await primeiraTela.clicarLogin();
       });
       
       await test.step('Then os campos vazios são sinalizados como obrigatórios', async () => {

        if (caso.email === '') {
            await expect(primeiraTela.campoEmailLogin)
                .toHaveJSProperty('validity.valueMissing', true);
        }

        if (caso.senha === '') {
            await expect(primeiraTela.campoSenhaLogin)
                .toHaveJSProperty('validity.valueMissing', true);
        }

       });

       await test.step('And o usuário permanece na tela de login', async () => {
            await expect(primeiraTela.textoPrimeiraTela).toBeVisible();
       });

    }); 

    }


});