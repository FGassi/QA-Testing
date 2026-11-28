import { Page, Locator } from '@playwright/test';
import { Menu } from '../components/menu.component';

export class HomePage {
    page:Page;
    menu:Menu;
    titulo:Locator;

    constructor(page: Page) {
        this.page = page;
        this.menu = new Menu(page);
        this.titulo = this.page.locator('.carousel-inner .item.active h1');
    }

    async acessarPagina() {
        await this.page.goto('https://automationexercise.com/');
    }

}
