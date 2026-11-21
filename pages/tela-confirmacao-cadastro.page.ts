import { Page, Locator } from '@playwright/test';


export class TelaConfirmacao {

    textoConfirmacaoCadastro:Locator;
    textoConfirmacaoDeletar:Locator;

     constructor(page: Page) {
            this.textoConfirmacaoCadastro = page.getByRole('heading', { name: 'Account Created!' });
            this.textoConfirmacaoDeletar = page.getByRole('heading', { name: 'Account Deleted!' });
        }
}