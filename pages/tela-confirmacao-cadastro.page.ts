import { Page, Locator } from '@playwright/test';


export class TelaConfirmacaoCadastro {

    textoTelaConfirmacao:Locator;

     constructor(page: Page) {
            this.textoTelaConfirmacao = page.getByRole('heading', { name: 'Account Created!' });
        }
}