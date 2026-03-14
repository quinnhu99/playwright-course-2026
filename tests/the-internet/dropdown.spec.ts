import { test, expect } from '@playwright/test';

test('verify dropdown functionality', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');

  await page.locator('#dropdown').selectOption('Option 1');
  await expect(page.locator('#dropdown')).toHaveValue('1');
  await expect(page.locator('option:checked')).toHaveText('Option 1');
});

// test('check multiple options', async ({ page }) => {
//   await page.goto('https://output.jsbin.com/osebed/2');

//   await page.locator('#fruits').selectOption(['Banana', 'Apple']);
//   await expect(page.locator('option:checked')).toHaveText('Banana, Apple');
// });