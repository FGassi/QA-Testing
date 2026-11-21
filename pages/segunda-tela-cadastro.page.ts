import { Page, Locator } from '@playwright/test';
import { AutenticacaoPage } from './tela-autenticacao.page';
import { HomePage } from './home-tela.page';
import { usuarioValido, emailGerado } from '../test-data/usuarios';
import { Menu } from '../components/menu.component';



export class SegundaTelaCadastro {
    primeiraTela: AutenticacaoPage;
    page:Page;
    botaoCriarConta:Locator;
    textoSegundaTela:Locator;
    //campos obrigatorios
    campoSenha:Locator;
    campoPrimeiroNome:Locator;
    campoSobrenome:Locator;
    campoEndereco:Locator;
    campoPais:Locator;
    campoEstado:Locator;
    campoCidade:Locator;
    campoCep:Locator;
    campoCelular:Locator;
    menu:Menu
    homepage: HomePage;

    constructor(page: Page) {
        this.primeiraTela = new AutenticacaoPage(page);
        this.page = page;
        this.botaoCriarConta = page.getByRole('button', { name: 'Create Account' });
        //campos obrigatorios
        this.campoSenha = page.getByTestId('password');
        this.campoPrimeiroNome = page.getByTestId('first_name');
        this.campoSobrenome = page.getByTestId('last_name');
        this.campoEndereco = page.getByTestId('address');
        this.campoPais = page.getByTestId('country');
        this.campoEstado = page.getByTestId('state');
        this.campoCidade = page.getByTestId('city');
        this.campoCep = page.getByTestId('zipcode');
        this.campoCelular = page.getByTestId('mobile_number');
        this.textoSegundaTela = page.getByRole('heading', { name: 'Enter Account Information' });
        this.menu = new Menu(page);
        this.homepage = new HomePage(page);
    }

    async acessarSegundaTela(){
        await this.homepage.acessarPagina();
        await this.primeiraTela.menu.acessarTelaAutenticacao();
        await this.primeiraTela.preencherCampoNome(usuarioValido.nome);
        await this.primeiraTela.preencherCampoEmail(emailGerado());
        await this.primeiraTela.clicarCadastrar();
    }

    async preencherCamposObrigatorios(){
        await this.campoSenha.fill(usuarioValido.password);
        await this.campoPrimeiroNome.fill(usuarioValido.nome);
        await this.campoSobrenome.fill(usuarioValido.sobrenome);
        await this.campoEndereco.fill(usuarioValido.enderecoUm);
        await this.campoPais.selectOption(usuarioValido.pais); //.selectOption({ value: 'Singapore' });  pelo atributo value
        await this.campoEstado.fill(usuarioValido.estado);
        await this.campoCidade.fill(usuarioValido.cidade);
        await this.campoCep.fill(usuarioValido.cep);
        await this.campoCelular.fill(usuarioValido.celular);
    }

    async preencherCamposOpcionais(){
        await this.page.getByRole('radio', { name: usuarioValido.titulo }).check();
        await this.page.getByTestId('days').selectOption(usuarioValido.diaNascimento);
        await this.page.getByTestId('months').selectOption(usuarioValido.mesNascimento);
        await this.page.getByTestId('years').selectOption(usuarioValido.anoNascimento);
        await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
        await this.page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).check();
        await this.page.getByTestId('company').fill(usuarioValido.empresa);
        await this.page.getByTestId('address2').fill(usuarioValido.enderecoDois);
    }

    async clicarCriarConta(){
        await this.botaoCriarConta.click();
    }

}
