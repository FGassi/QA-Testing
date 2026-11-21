import { Page, Locator } from '@playwright/test';
import { Menu } from '../components/menu.component';

export class TelaProdutos {
    page:Page;
    menu:Menu;
    produtoUm:Locator;
    emptyCart: Locator;


    constructor(page: Page) {
        this.page = page;
        this.menu = new Menu(page);
        this.produtoUm = this.page.locator('a[data-product-id="1"]').first();
        this.emptyCart = this.page.getByText('Cart is empty!');
    }

    async adicionarProduto(){
        await this.produtoUm.scrollIntoViewIfNeeded();
        await this.produtoUm.click();
    }


}
