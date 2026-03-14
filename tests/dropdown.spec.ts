import {test, expect} from '@playwright/test';

test ('able to select multiple options', async ({page}) => {

  await page.goto('https://output.jsbin.com/osebed/2');
  await page.locator('#fruits').selectOption(['banana', 'apple']);
  await expect (page.locator('#fruits')).toHaveValues(['banana', 'apple']);
  await expect (page.locator('#fruits > option:checked')).toHaveText (['Banana', 'Apple']);
  await expect (page.locator('#fruits > option:not(:checked)')).toHaveText (['Orange', 'Grape']);

  
});