
import { test, expect } from '@playwright/test';
import {emailGerado} from '../../../test-data/usuarios';

test.describe('Cadastro de usuário - API', {
    tag: ['@api']}, () => {
        
    test('@AQ-TC-9: Cadastro bem-sucedido com parâmetros obrigatórios', {
        tag: ['@regression']}, async ({ request }) => {

        const response = await request.post('https://automationexercise.com/api/createAccount', {
            form: {
                name: 'Felipe',
                email: emailGerado(),
                password: 'Senha123',
                firstname: 'Felipe',
                lastname: 'Gassi',
                address1: 'Rua Exemplo, 123',
                country: 'Canada',
                zipcode: '09000-000',
                state: 'Sao Paulo',
                city: 'Santo Andre',
                mobile_number: '11999999999',
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.responseCode).toBe(201);
        expect(responseBody.message).toBe('User created!');
        
    });
});