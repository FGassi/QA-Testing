import { Page, Locator } from '@playwright/test';
import { PrimeiraTelaCadastro } from './primeira-tela-cadastro.page';
import { usuarioValido, emailGerado } from '../test-data/usuarios';


export class SegundaTelaCadastro {
    primeiraTela: PrimeiraTelaCadastro;
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

    constructor(page: Page) {
        this.primeiraTela = new PrimeiraTelaCadastro(page);
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
    }

    async acessarSegundaTela(){
        await this.primeiraTela.acessarPrimeiraTela();
        await this.primeiraTela.preencherCampoNome(usuarioValido.nome);
        await this.primeiraTela.preencherCampoEmail(emailGerado());
        await this.primeiraTela.clicarCadastrar();
    }

    async preencherCamposObrigatorios(){
        await this.campoSenha.fill(`${process.env.SENHA_NOVO_USUARIO}`);
        await this.campoPrimeiroNome.fill(usuarioValido.nome);
        await this.campoSobrenome.fill(usuarioValido.sobrenome);
        await this.campoEndereco.fill(`${process.env.ENDERECO}`);
        await this.campoPais.selectOption('Singapore'); //.selectOption({ value: 'Singapore' });  pelo atributo value
        await this.campoEstado.fill(usuarioValido.estado);
        await this.campoCidade.fill(usuarioValido.cidade);
        await this.campoCep.fill(`${process.env.CEP}`);
        await this.campoCelular.fill(`${process.env.CELULAR}`);
    }

    async preencherCamposOpcionais(){
        await this.page.getByRole('radio', { name: 'Mr.' }).check();
        await this.page.getByTestId('days').selectOption('9');
        await this.page.getByTestId('months').selectOption('November');
        await this.page.getByTestId('years').selectOption('1999');
        await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
        await this.page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).check();
        await this.page.getByTestId('company').fill('Empresa');
        await this.page.getByTestId('address2').fill('Endereço dois');
    }

    async clicarCriarConta(){
        await this.botaoCriarConta.click();
    }

}
