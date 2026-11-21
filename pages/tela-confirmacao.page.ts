import { Page, Locator } from '@playwright/test';


export class TelaConfirmacao {

    textoConfirmacaoCadastro:Locator;
    textoConfirmacaoDeletar:Locator;
    continuarButton:Locator;

    constructor(page: Page) {
            this.textoConfirmacaoCadastro = page.getByRole('heading', { name: 'Account Created!' });
            this.textoConfirmacaoDeletar = page.getByRole('heading', { name: 'Account Deleted!' });
            this.continuarButton = page.getByTestId('continue-button');
    }

    
    async clicarContinuar(){
        await this.continuarButton.click();

    }
}