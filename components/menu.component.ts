import { Page, Locator } from '@playwright/test';

export class Menu {
    page: Page;
    logoutButton:Locator;
    loginButton:Locator;
    productsButton:Locator;
    cartButton:Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = this.page.getByRole('link', { name: 'Logout' });
        this.loginButton = this.page.getByRole('link', { name: 'Signup / Login' });
        this.productsButton = this.page.getByRole('link', { name: 'Products' });
        this.cartButton = this.page.getByRole('link', { name: 'Cart' });
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
    
}