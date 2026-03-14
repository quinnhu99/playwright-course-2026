import { test, expect } from '@playwright/test';
import { url } from 'node:inspector';

test('verify status code links', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/status_codes');

  await page.getByRole('link', { name: '200' }).click();
  await expect(page.url()).toContain('status_codes/200');
  await expect(page.locator(`#content > div.example > p`)).toContainText('200 status code');
  await page.getByRole('link', { name: 'here' }).click();

  await page.getByRole('link', { name: '301' }).click();
  await expect(page.url()).toContain('status_codes/301');  
  await expect(page.locator(`#content > div.example > p`)).toContainText('301 status code');
  await page.getByRole('link', { name: 'here' }).click();
  
  await page.getByRole('link', { name: '404' }).click();
  await expect(page.url()).toContain('status_codes/404');
  await expect(page.locator(`#content > div.example > p`)).toContainText('404 status code');
  await page.getByRole('link', { name: 'here' }).click();

  await page.getByRole('link', { name: '500' }).click(); 
  await expect(page.url()).toContain('status_codes/500'); 
  await expect(page.locator(`#content > div.example > p`)).toContainText('500 status code');
  await page.getByRole('link', { name: 'here' }).click();
});