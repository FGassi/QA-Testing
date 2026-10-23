import { test, expect } from '@playwright/test';

test('Cadastro com campo e-mail vazio na primeira tela de cadastro', async ({ page }) => {
  
  //Given
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  
  //When
  await page.getByTestId('signup-name').fill('Peter');

  //And
  await page.getByRole('button', { name: 'Signup' }).click();

  //Then
  await expect(page.getByRole('heading', { name: 'New User Signup' })).toBeVisible();
  await expect(page.getByTestId('signup-email')).toHaveAttribute('required');

});