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

    //metodo privado de organização
    availability!: Locator;
    condition!: Locator;
    brand!: Locator;
    nomeProduto!: Locator;
    precoProduto!: Locator;

    //metodo privado de organização
    writeReview!: Locator;
    nomeAvaliacao!:Locator;
    emailAvaliacao!:Locator;
    reviewAvaliacao!:Locator;
    submitButton!:Locator;
    confirmacaoAvaliacao!:Locator;


    constructor(page: Page) {
        this.page = page;
        this.menu = new Menu(page);
        this.produtoUm = this.page.locator('a[data-product-id="1"]').first();
        this.emptyCart = this.page.getByText('Cart is empty!');
        this.titulo = this.page.getByRole('heading', { name: 'All Products' });
        this.listaProdutos = this.page.locator('.features_items');
        this.produtos = this.page.locator('.product-image-wrapper');
        this.viewProduct = this.page.getByRole('link', { name: 'View Product' }).first();


        //metodo privado para organização
        this.inicializarLocatorsDetalhes();  
        this.inicializarLocatorsAvaliacao();
    }

    //locators separados em métodos privados - estudo
    private inicializarLocatorsDetalhes() {
        this.availability = this.page.locator('.product-information').getByText('Availability:');
        this.condition = this.page.locator('.product-information').getByText('Condition:');
        this.brand = this.page.locator('.product-information').getByText('Brand:');
        this.nomeProduto = this.page.locator('.product-information h2');
        this.precoProduto = this.page.locator('.product-information > span > span')
    }

    private inicializarLocatorsAvaliacao() {
        //review
        this.writeReview = this.page.getByRole('link', { name: 'Write Your Review' });
        this.nomeAvaliacao = this.page.getByPlaceholder('Your Name');
        this.emailAvaliacao = this.page.getByPlaceholder('Email Address').first();
        this.reviewAvaliacao = this.page.getByPlaceholder('Add Review Here!');
        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
        this.confirmacaoAvaliacao = this.page.getByText('Thank you for your review.');
    }


    async acessarPagina() {
        // Bloqueia requisições de redes de publicidade
        await this.page.route(
        /(googlesyndication\.com|doubleclick\.net|googleadservices\.com)/i,
        route => route.abort()
        );

        await this.page.goto('https://automationexercise.com/products');
        await this.page.goto('https://automationexercise.com/products');
    }

    async adicionarProduto(){
        await this.produtoUm.scrollIntoViewIfNeeded();
        await this.produtoUm.click();
    }

    async visualizarProduto() {
        await this.viewProduct.click();
    }

    async inserirNomeAvaliacao(nome:string){
        await this.nomeAvaliacao.fill(nome);
    }

    async inserirEmailAvaliacao(email:string){
        await this.emailAvaliacao.fill(email);
    }

    async inserirTextoAvaliacao(texto:string){
        await this.reviewAvaliacao.fill(texto);    
    }

    async submeterAvaliacao() {
    await this.submitButton.click();
    }

}
