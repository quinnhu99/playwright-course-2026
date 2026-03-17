import { test, expect } from '@playwright/test';

test('verify checkbox functionality', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

  await page.getByRole('checkbox').first().check();
  await page.locator("#checkboxes input:nth-child(1)").check(); //css
    await page.locator("//*[@id='checkboxes']/input[1]").check(); //xpath
    await page.locator("//*[@id='checkboxes']/input[1]").isChecked(); //xpath
  expect (await page.getByRole('checkbox').first()).toBeChecked();

  await page.getByRole('checkbox').nth(1).check();
  expect (await page.getByRole('checkbox').nth(1)).toBeChecked();  
});