import { Page, Locator } from '@playwright/test';
import { Menu } from '../components/menu.component';

export class TelaProdutos {
    page:Page;
    menu:Menu;
    produtoUm:Locator;
    emptyCart: Locator;
    titulo: Locator;
    listaProdutos: Locator;
    produtos: Locator;
    viewProduct: Locator;
    availability: Locator;
    condition: Locator;
    brand: Locator;
    nomeProduto: Locator;
    precoProduto: Locator;
    visualizarProdutoButton: Locator;
    


    constructor(page: Page) {
        this.page = page;
        this.menu = new Menu(page);
        this.produtoUm = this.page.locator('a[data-product-id="1"]').first();
        this.emptyCart = this.page.getByText('Cart is empty!');
        this.titulo = this.page.getByRole('heading', { name: 'All Products' });
        this.listaProdutos = this.page.locator('.features_items');
        this.produtos = this.page.locator('.product-image-wrapper');
        this.viewProduct = this.page.getByRole('link', { name: 'View Product' }).first();
        this.availability = this.page.locator('.product-information').getByText('Availability:');
        this.condition = this.page.locator('.product-information').getByText('Condition:');
        this.brand = this.page.locator('.product-information').getByText('Brand:');
        this.nomeProduto = this.page.locator('.product-information h2');
        this.precoProduto = this.page.locator('.product-information > span > span');
        this.visualizarProdutoButton = this.page.getByRole('link', { name: 'View Product' }).first();        
    }

    async acessarPagina() {
        await this.page.goto('https://automationexercise.com/products');
    }

    async adicionarProduto(){
        await this.produtoUm.scrollIntoViewIfNeeded();
        await this.produtoUm.click();
    }

    async visualizarProduto() {
        await this.viewProduct.click();
    }


}
