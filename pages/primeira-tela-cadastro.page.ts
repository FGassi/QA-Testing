import { Page, Locator } from '@playwright/test';

export class PrimeiraTelaCadastro {
    page:Page;
    campoNome:Locator;
    botaoCadastrar:Locator;
    textoPrimeiraTela:Locator;
    campoEmail:Locator;
    textoEmailExistente:Locator;

    constructor(page: Page) {
        this.page = page;
        this.campoNome = this.page.getByTestId('signup-name');
        this.botaoCadastrar = this.page.getByRole('button', { name: 'Signup' });
        this.textoPrimeiraTela = this.page.getByRole('heading', { name: 'New User Signup' });
        this.campoEmail = this.page.getByTestId('signup-email');
        this.textoEmailExistente = this.page.getByText('Email Address already exist!');
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

}
