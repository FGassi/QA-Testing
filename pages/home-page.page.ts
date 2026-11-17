import { Page, Locator } from '@playwright/test';

export class HomePage {
    page:Page;
    textoLogout:Locator;


    constructor(page: Page) {
        this.page = page;
        this.textoLogout = this.page.getByRole('link', { name: 'Logout' });
    }

    async acessarPrimeiraTela(){
        await this.page.goto('https://automationexercise.com/');
        await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    }

    async validarLogin(){
        
    }
}
