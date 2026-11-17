import { Page, Locator } from '@playwright/test';

export class AutenticacaoPage {
    page:Page;
    campoNome:Locator;
    botaoCadastrar:Locator;
    textoPrimeiraTela:Locator;
    campoEmail:Locator;
    textoEmailExistente:Locator;
    campoEmailLogin:Locator;
    campoSenhaLogin:Locator;
    botaoLogin:Locator;
    textoLoginIncorreto:Locator;

    constructor(page: Page) {
        this.page = page;
        this.campoNome = this.page.getByTestId('signup-name');
        this.botaoCadastrar = this.page.getByRole('button', { name: 'Signup' });
        this.textoPrimeiraTela = this.page.getByRole('heading', { name: 'New User Signup' });
        this.campoEmail = this.page.getByTestId('signup-email');
        this.textoEmailExistente = this.page.getByText('Email Address already exist!');
        this.campoEmailLogin = this.page.getByTestId('login-email');
        this.campoSenhaLogin = this.page.getByTestId('login-password');
        this.botaoLogin = this.page.getByTestId('login-button');
        this.textoLoginIncorreto = this.page.getByText('Your email or password is incorrect!');
    }

    async acessarPrimeiraTela(){
        await this.page.goto('https://automationexercise.com/');
        await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    }

    async preencherCampoNome(nome: string){
        await this.campoNome.fill(nome);
    }

    async clicarCadastrar(){
        await this.botaoCadastrar.click();
    } 

    async preencherCampoEmail(email: string){
        await this.campoEmail.fill(email);
    }

    async preencherCampoEmailLogin(email:string){
        await this.campoEmailLogin.fill(email);
    }

    async preencherSenhaLogin(senha:string){
        await this.campoSenhaLogin.fill(senha);
    }

    async clicarLogin(){
        await this.botaoLogin.click();
    }
}
