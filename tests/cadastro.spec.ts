import { test, expect } from '@playwright/test';
import { usuarioValido, usuarioInvalido, usuarioExistente} from '../test-data/usuarios';

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

    test('@AQ-TC-3: Cadastro com campo nome vazio na primeira tela de cadastro', async ({ page }) => {
       
        await test.step('When o visitante preenche o campo email', async () => {
            await page.getByTestId('signup-email').fill(usuarioValido.email);
        });

        //And deixa o campo email vazio

        await test.step('And clica no botão de cadastrar', async () => {
            await page.getByRole('button', { name: 'Signup' }).click();
        });

        await test.step('Then o visitante permanece na primeira tela de cadastro', async () => {
            await expect(page.getByRole('heading', { name: 'New User Signup' })).toBeVisible();
        });

        await test.step('And o campo nome é sinalizado como obrigatório', async () => {
            await expect(page.getByTestId('signup-email')).toHaveAttribute('required');
        });
    });

    test('@AQ-TC-4: Cadastro com formatação de e-mail incorreta na primeira tela de cadastro', async ({ page }) => {
       
        await test.step('When o visitante preenche o campo email sem @', async () => {
            await page.getByTestId('signup-email').fill(usuarioInvalido.email);
        });

        await test.step('And preenche o campo nome', async () => {
            await page.getByTestId('signup-name').fill(usuarioValido.nome);
        });

        await test.step('And clica no botão de cadastrar', async () => {
            await page.getByRole('button', { name: 'Signup' }).click();
        });

        await test.step('Then o visitante permanece na primeira tela de cadastro', async () => {
            await expect(page.getByRole('heading', { name: 'New User Signup' })).toBeVisible();
        });

        await test.step('And o visitante é avisado de que o formato do e-mail é inválido', async () => {
            await expect(page.getByTestId('signup-email')).toHaveAttribute('type', 'email');
        });
    });

    test('@AQ-TC-5: Cadastro com e-mail existente', async ({ page }) => {
       
        await test.step('When o visitante preenche o campo obrigatório Nome', async () => {
            await page.getByTestId('signup-name').fill(usuarioExistente.nome);
        });

        await test.step('And preenche o campo e-mail com o e-mail do usuário cadastrado', async () => {
            await page.getByTestId('signup-email').fill(usuarioExistente.email);
        });

        await test.step('And clica no botão de cadastrar', async () => {
            await page.getByRole('button', { name: 'Signup' }).click();
        });

        await test.step('Then o visitante permanece na primeira tela de cadastro', async () => {
            await expect(page.getByRole('heading', { name: 'New User Signup' })).toBeVisible();
        });

        await test.step('And o sistema avisa que o endereço de e-mail já existe', async () => {
            await expect(page.getByText('Email Address already exist!')).toBeVisible();
        });

    }); 

});

test.describe('Segunda tela de cadastro', () => {

    test.beforeEach(async ({ page }) => {
        await test.step('Given que o visitante se encontra na segunda tela de cadastro', async () => {
            await page.goto('https://automationexercise.com/');
            await page.getByRole('link', { name: 'Signup / Login' }).click();
            await page.getByTestId('signup-name').fill(usuarioValido.nome);
            await page.getByTestId('signup-email').fill(usuarioValido.email);
            await page.getByRole('button', { name: 'Signup' }).click();
        });
    });
    
    test('@AQ-TC-6: Cadastro com campos obrigatórios vazios na segunda tela de cadastro', async ({ page }) => {
       
        await test.step('When o visitante não preenche os demais campos obrigatórios', async () => {
        });

        await test.step('And clica no botão "Criar conta"', async () => {
        });

        await test.step('Then o sistema avisa que os campos obrigatórios devem ser preenchidos', async () => {
            
        });

        await test.step('And o visitante permanece na segunda tela de cadastro', async () => {

        });
    });

    test('@AQ-TC-7: Cadastro bem sucedido com campos obrigatórios', async ({ page }) => {
       
        await test.step('When o visitante preenche os demais campos obrigatórios com dados válidos', async () => {
        });

        await test.step('And clica no botão "Criar conta"', async () => {
        });

        await test.step('Then o sistema direciona o usuário cadastrado para uma tela de confirmação', async () => {
            
        });

    });

    test('@AQ-TC-8: Cadastro bem-sucedido com campos obrigatórios e opcionais', async ({ page }) => {
       
        await test.step('When o visitante preenche todos os campos obrigatórios', async () => {
        });

        await test.step('And preenche os demais campos não obrigatórios', async () => {
        });

        await test.step('And clica no botão "Criar conta"', async () => {
            
        });

        await test.step('Then o sistema direciona o usuário cadastrado para uma tela de confirmação', async () => {

        });
    });
});