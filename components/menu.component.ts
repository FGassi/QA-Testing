import { Page, Locator } from '@playwright/test';

export class Menu {
    page: Page;
    logoutButton:Locator;
    loginButton:Locator;
    productsButton:Locator;
    cartButton:Locator;
    deleteButton :Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = this.page.getByRole('link', { name: 'Logout' });
        this.loginButton = this.page.getByRole('link', { name: 'Signup / Login' });
        this.productsButton = this.page.getByRole('link', { name: 'Products' });
        this.cartButton = this.page.getByRole('link', { name: 'Cart' });
        this.deleteButton = this.page.getByRole('link', { name: 'Delete Account' }); 
    }

    async realizarLogout(){
        await this.logoutButton.click();
    }

    async acessarTelaAutenticacao(){
        await this.loginButton.click();
    }

    async acessarTelaProdutos(){
        await this.productsButton.click();
    }

    async acessarTelaCarrinho(){
        await this.cartButton.click();
    }

    async deletarConta(){
        await this.deleteButton.click();
    }
    
}