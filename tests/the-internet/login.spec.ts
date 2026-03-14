import { test, expect } from '@playwright/test';

test('verify login functionality - use getByRole', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await expect(page.getByText('You logged into a secure area')).toBeVisible();
  await expect (page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
});

test('verify login functionality - use CSS', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.locator(`i:has-text("Login")`).click();
  
  await expect(page.locator('.flash.success')).toBeVisible();
  await expect (page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
});

test('verify login functionality - use XPath', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator(`//input[@id='username']`).fill('tomsmith');
  await page.locator(`//input[@id='password']`).fill('SuperSecretPassword!');
  await page.locator(`//button[@type='submit']`).click();
  
  await expect(page.locator(`//div[@id='flash']`)).toBeVisible();
  await expect (page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
});

