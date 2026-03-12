import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('verify fullname of max due person', async ({page}) =>{
   await page.goto('https://the-internet.herokuapp.com/tables');
   // const tableContents =  await page.locator("#table1 tbody tr td").allTextContents();
   // //print table content
   // console.log(tableContents);
   const dueAmounts = await page.locator("#table1 tbody tr td:nth-child(4)").allTextContents();
   // console.log(dueAmounts);
   //Give array  [ '$50.00', '$51.00', '$100.00', '$50.00' ]  find the index of item has max value?
   const maxDueValue = Math.max(...dueAmounts.map(amount => parseFloat(amount.replace('$', ''))));
   const maxDueIndex = dueAmounts.indexOf('$' + maxDueValue.toFixed(2));
   // console.log(maxDueIndex);
   const firstName = await page.locator(`#table1 tbody tr:nth-child(${maxDueIndex + 1}) td:nth-child(2)`).textContent();
   const lastName = await page.locator(`#table1 tbody tr:nth-child(${maxDueIndex + 1}) td:nth-child(1)`).textContent();
   // console.log(`Full name of person with max due: ${firstName} ${lastName}`);
   expect(`${firstName} ${lastName}`).toBe('Jason Doe');
});

