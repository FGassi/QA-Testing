import { test, expect } from '@playwright/test';
import { usuarioValido } from '../test-data/usuarios';

test.describe('Primeira tela de cadastro', () => {

    test.beforeEach(async ({ page }) => {
        await test.step('Given que o visitante se encontra na primeira tela de cadastro', async () => {
            await page.goto('https://automationexercise.com/');
            await page.getByRole('link', { name: 'Signup / Login' }).click();
        });
    });

    test('AQ-TC-1: Cadastro com campo e-mail vazio na primeira tela de cadastro', async ({ page }) => {

        await test.step('When o visitante preenche o campo nome', async () => {
            await page.getByTestId('signup-name').fill(usuarioValido.nome);
        });
        
        //And deixa o campo email vazio

        await test.step('And clica no botão de cadastrar', async () => {
            await page.getByRole('button', { name: 'Signup' }).click();
        });

        await test.step('Then o visitante permanece na primeira tela de cadastro', async () => {
            await expect(page.getByRole('heading', { name: 'New User Signup' })).toBeVisible();
        });

        await test.step('And o campo e-mail é sinalizado como obrigatório', async () => {
            await expect(page.getByTestId('signup-email')).toHaveAttribute('required');
        });
    });

    test('Cadastro com campo nome vazio na primeira tela de cadastro', async ({ page }) => {
       
    });
});


