import { test, expect } from '../../../fixtures/test-fixture';
import { usuarioValido, usuarioInvalido, emailGerado} from '../../../test-data/usuarios';
import { AutenticacaoPage } from '../../../pages/tela-autenticacao.page'; 
import { SegundaTelaCadastro } from '../../../pages/segunda-tela-cadastro.page';
import { TelaConfirmacao } from '../../../pages/tela-confirmacao.page';
import { HomePage } from '../../../pages/home-tela.page';

test.describe('Primeira tela de cadastro', {tag: ['@ui']} ,() => {
    
    let primeiraTela: AutenticacaoPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        primeiraTela = new AutenticacaoPage(page);

        await test.step('Given que o visitante se encontra na primeira tela de cadastro', async () => {
            await homePage.acessarPagina();
            await primeiraTela.menu.acessarTelaAutenticacao();
        });
    });

    test('@AQ-TC-1: Cadastro com campo e-mail vazio na primeira tela de cadastro', {
        tag: ['@regression'],
    }, async ({ page }) => {

        await test.step('When o visitante preenche o campo nome', async () => {
            await primeiraTela.preencherCampoNome(usuarioValido.nome);
        });
        
        await test.step('And deixa o campo email vazio', async () => {
        });

        await test.step('And clica no botão de cadastrar', async () => {
            await primeiraTela.clicarCadastrar();
        });
        
        await test.step('Then o visitante permanece na primeira tela de cadastro', async () => {
            await expect(primeiraTela.textoPrimeiraTela).toBeVisible();
        });

        await test.step('And o campo e-mail é sinalizado como obrigatório', async () => {
            await expect(primeiraTela.campoEmail).toHaveAttribute('required');
        });
    });

    test('@AQ-TC-3: Cadastro com campo nome vazio na primeira tela de cadastro', {
        tag: ['@regression'],
    }, async ({ page }) => {
       
        await test.step('When o visitante preenche o campo email com um endereço válido e ainda não cadastrado', async () => {
            await primeiraTela.preencherCampoEmail(emailGerado());
        });

        await test.step('deixa o campo nome vazio', async () => {
        });

        await test.step('And clica no botão de cadastrar', async () => {
            await primeiraTela.clicarCadastrar();
        });

        await test.step('Then o visitante permanece na primeira tela de cadastro', async () => {
            await expect(primeiraTela.textoPrimeiraTela).toBeVisible();
        });

        await test.step('And o campo nome é sinalizado como obrigatório', async () => {
             await expect(primeiraTela.campoNome).toHaveAttribute('required');
        });
    });

    test('@AQ-TC-4: Cadastro com formatação de e-mail incorreta na primeira tela de cadastro', {
        tag: ['@regression'],
    }, async ({ page }) => {
       
        await test.step('When o visitante preenche o campo email sem @', async () => {
            await primeiraTela.preencherCampoEmail(usuarioInvalido.email);
        });

        await test.step('And o visitante preenche o campo nome', async () => {
            await primeiraTela.preencherCampoNome(usuarioValido.nome);
        });

        await test.step('And clica no botão de cadastrar', async () => {
            await primeiraTela.clicarCadastrar();
        });

        await test.step('Then o visitante permanece na primeira tela de cadastro', async () => {
            await expect(primeiraTela.textoPrimeiraTela).toBeVisible();
        });

        await test.step('And o visitante é avisado de que o formato do e-mail é inválido', async () => {
            await expect(primeiraTela.campoEmail).toHaveAttribute('type', 'email');
        });
    });

    test('@AQ-TC-5: Cadastro com e-mail existente', {
        tag: ['@regression'],
    }, async ({ page }) => {
       
        await test.step('existe um usuário cadastrado com um e-mail', async () => {
        });

        await test.step('When o visitante preenche o campo obrigatório Nome', async () => {
            await primeiraTela.preencherCampoNome(usuarioValido.nome);
        });

        await test.step('And preenche o campo e-mail com o e-mail do usuário cadastrado', async () => {
            await primeiraTela.preencherCampoEmail(usuarioValido.email);
        });

        await test.step('And clica no botão de cadastrar', async () => {
            await primeiraTela.clicarCadastrar();
        });

        await test.step('Then o visitante permanece na primeira tela de cadastro', async () => {
            await expect(primeiraTela.textoPrimeiraTela).toBeVisible();
        });

        await test.step('And o sistema avisa que o endereço de e-mail já existe', async () => {
            await expect(primeiraTela.textoEmailExistente).toBeVisible();
        });

    }); 

});

test.describe('Segunda tela de cadastro', {tag: ['@ui']} ,() => {
    let primeiraTela: AutenticacaoPage;
    let segundaTela: SegundaTelaCadastro;

    test.beforeEach(async ({ page }) => {
        await test.step('Given que o visitante se encontra na segunda tela de cadastro', async () => {
            segundaTela = new SegundaTelaCadastro(page);
            const emailUsuario = emailGerado();
            await segundaTela.acessarSegundaTela(emailUsuario);
        });
    });
    
    test('@AQ-TC-6: Cadastro com campos obrigatórios vazios na segunda tela de cadastro', {
        tag: ['@regression'],
    }, async ({ page }) => {

        await test.step('When o visitante não preenche os demais campos obrigatórios', async () => {
        });

        await test.step('And clica no botão "Criar conta" ', async () => {
            await segundaTela.clicarCriarConta();
        });

        await test.step('Then o sistema avisa que os campos obrigatórios devem ser preenchidos', async () => {
            await expect(segundaTela.campoSenha).toHaveAttribute('required');
            await expect(segundaTela.campoPrimeiroNome).toHaveAttribute('required');
            await expect(segundaTela.campoSobrenome).toHaveAttribute('required');
            await expect(segundaTela.campoEndereco).toHaveAttribute('required');
            await expect(segundaTela.campoPais).toHaveAttribute('required');
            await expect(segundaTela.campoEstado).toHaveAttribute('required');
            await expect(segundaTela.campoCidade).toHaveAttribute('required');
            await expect(segundaTela.campoCep).toHaveAttribute('required');
            await expect(segundaTela.campoCelular).toHaveAttribute('required');
        });

        await test.step('And o visitante permanece na segunda tela de cadastro', async () => {
            await expect(segundaTela.textoSegundaTela).toBeVisible();
        });
    });

    test('@AQ-TC-7: Cadastro bem sucedido com campos obrigatórios', {
        tag: ['@regression'],
    }, async ({ page }) => {
        
        await test.step('When o visitante preenche os demais campos obrigatórios com dados válidos', async () => {
            await segundaTela.preencherCamposObrigatorios();
        });
        
        await test.step('And clica no botão "Criar conta" ', async () => {
            await segundaTela.clicarCriarConta();
        });

        await test.step('Then o sistema direciona o usuário cadastrado para uma tela de confirmação', async () => {
            const telaConfirmacao = new TelaConfirmacao(page);
            await expect(telaConfirmacao.textoConfirmacaoCadastro).toBeVisible();
        });
    });

    test('@AQ-TC-8: Cadastro bem-sucedido com campos obrigatórios e opcionais',{
        tag: ['@smoke', '@regression'],
    }, async ({ page }) => {
       
        await test.step('When o visitante preenche os demais campos obrigatórios com dados válidos', async () => {
            await segundaTela.preencherCamposObrigatorios();
        });

        await test.step('And preenche os demais campos não obrigatórios', async () => {
            await segundaTela.preencherCamposOpcionais();
        });
    
        await test.step('And clica no botão "Criar conta" ', async () => {
            await segundaTela.clicarCriarConta();
        });

        await test.step('Then o sistema direciona o usuário cadastrado para uma tela de confirmação', async () => {
            const telaConfirmacao = new TelaConfirmacao(page);
            await expect(telaConfirmacao.textoConfirmacaoCadastro).toBeVisible();
        });
    });
});