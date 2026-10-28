import { test, expect, Page } from '@playwright/test';
import { usuarioValido, usuarioInvalido, usuarioExistente, emailGerado} from '../test-data/usuarios';

//Reaproveitamento de steps
//Actions
async function clicarCadastrar(page: Page) {
    await test.step('And clica no botão de cadastrar', async () => {
        await page.getByRole('button', { name: 'Signup' }).click();
    });
}

async function clicarCriarConta(page: Page) {
    await test.step('And clica no botão "Criar conta"', async () => {
        await page.getByRole('button', { name: 'Create Account' }).click();
    });
}

async function preencherCamposObrigatorios(page: Page) {
    await test.step('When o visitante preenche os demais campos obrigatórios com dados válidos', async () => {
            await page.getByTestId('password').fill(`${process.env.SENHA_NOVO_USUARIO}`);
            await page.getByTestId('first_name').fill(usuarioValido.nome);
            await page.getByTestId('last_name').fill(usuarioValido.sobrenome);
            await page.getByTestId('address').fill(usuarioValido.endereco);
            await page.getByTestId('country').selectOption('Singapore');
            //await page.getByTestId('country').selectOption({ value: 'Singapore' });  // pelo atributo value
            await page.getByTestId('state').fill(usuarioValido.estado);
            await page.getByTestId('city').fill(usuarioValido.cidade);
            await page.getByTestId('zipcode').fill(usuarioValido.cep);
            await page.getByTestId('mobile_number').fill(usuarioValido.celular);
        });
}

//Asserts
async function validarPrimeiraTela(page: Page) {
    await test.step('Then o visitante permanece na primeira tela de cadastro', async () => {
        await expect(page.getByRole('heading', { name: 'New User Signup' })).toBeVisible();
    });
}

async function validarCadastro(page: Page) {
    await test.step('Then o sistema direciona o usuário cadastrado para uma tela de confirmação', async () => {
        await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
    });
}

test.describe('Primeira tela de cadastro', () => {

    test.beforeEach(async ({ page }) => {
        await test.step('Given que o visitante se encontra na primeira tela de cadastro', async () => {
            await page.goto('https://automationexercise.com/');
            await page.getByRole('link', { name: 'Signup / Login' }).click();
        });
    });

    test('@AQ-TC-1: Cadastro com campo e-mail vazio na primeira tela de cadastro', async ({ page }) => {

        await test.step('When o visitante preenche o campo nome', async () => {
            await page.getByTestId('signup-name').fill(usuarioValido.nome);
        });
        
        //And deixa o campo email vazio

        await clicarCadastrar(page);

        await validarPrimeiraTela(page);

        await test.step('And o campo e-mail é sinalizado como obrigatório', async () => {
            await expect(page.getByTestId('signup-email')).toHaveAttribute('required');
        });
    });

    test('@AQ-TC-3: Cadastro com campo nome vazio na primeira tela de cadastro', async ({ page }) => {
       
        await test.step('When o visitante preenche o campo email', async () => {
            await page.getByTestId('signup-email').fill(emailGerado());
        });

        //And deixa o campo email vazio

        await clicarCadastrar(page);

        await validarPrimeiraTela(page);

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

        await clicarCadastrar(page);

        await validarPrimeiraTela(page);

        await test.step('And o visitante é avisado de que o formato do e-mail é inválido', async () => {
            await expect(page.getByTestId('signup-email')).toHaveAttribute('type', 'email');
        });
    });

    test('@AQ-TC-5: Cadastro com e-mail existente', async ({ page }) => {
       
        await test.step('When o visitante preenche o campo obrigatório Nome', async () => {
            await page.getByTestId('signup-name').fill(usuarioValido.nome);
        });

        await test.step('And preenche o campo e-mail com o e-mail do usuário cadastrado', async () => {
            await page.getByTestId('signup-email').fill(usuarioExistente.email);
        });

        await clicarCadastrar(page);

        await validarPrimeiraTela(page);

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
            await page.getByTestId('signup-email').fill(emailGerado());
            await page.getByRole('button', { name: 'Signup' }).click();
        });
    });
    
    test('@AQ-TC-6: Cadastro com campos obrigatórios vazios na segunda tela de cadastro', async ({ page }) => {

        await clicarCriarConta(page);
        
        await test.step('Then o sistema avisa que os campos obrigatórios devem ser preenchidos', async () => {
            await expect(page.getByTestId('password')).toHaveAttribute('required');
            await expect(page.getByTestId('first_name')).toHaveAttribute('required');
            await expect(page.getByTestId('last_name')).toHaveAttribute('required');
            await expect(page.getByTestId('address')).toHaveAttribute('required');
            await expect(page.getByTestId('country')).toHaveAttribute('required');
            await expect(page.getByTestId('state')).toHaveAttribute('required');
            await expect(page.getByTestId('city')).toHaveAttribute('required');
            await expect(page.getByTestId('zipcode')).toHaveAttribute('required');
            await expect(page.getByTestId('mobile_number')).toHaveAttribute('required');
        });

        await test.step('And o visitante permanece na segunda tela de cadastro', async () => {
            await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();
        });
    });

    test('@AQ-TC-7: Cadastro bem sucedido com campos obrigatórios', async ({ page }) => {
       
        await preencherCamposObrigatorios(page)

        await clicarCriarConta(page);

        await validarCadastro(page);
    
    });

    test('@AQ-TC-8: Cadastro bem-sucedido com campos obrigatórios e opcionais', async ({ page }) => {
       
        await preencherCamposObrigatorios(page);

        await test.step('And preenche os demais campos não obrigatórios', async () => {
            await page.getByRole('radio', { name: 'Mr.' }).check();
            await page.getByTestId('days').selectOption('9');
            await page.getByTestId('months').selectOption('November');
            await page.getByTestId('years').selectOption('1999');
            await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
            await page.getByRole('checkbox', { name: 'Receive special offers from our partners!' }).check();
            await page.getByTestId('company').fill('Empresa');
            await page.getByTestId('address2').fill('Endereço dois');
        });

        await clicarCriarConta(page);

        await validarCadastro(page);
    
    });
});


