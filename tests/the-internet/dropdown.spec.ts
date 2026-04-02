import {test, expect} from './fixrtures/the-internet.fixture';

test ('able to select multiple options', async ({dropdownPage}) => {

  await dropdownPage.goto();
  await dropdownPage.selectOptionByValue('1');
  await expect(await dropdownPage.getSelectedOption()).toBe('Option 1');

  await dropdownPage.selectOptionByValue('2');
  await expect(await dropdownPage.getSelectedOption()).toBe('Option 2');
  //await expect (dropdownPage.page.locator('#dropdown > option:checked')).toHaveText(['Banana']);
  //await expect (dropdownPage.page.locator('#fruits > option:not(:checked)')).toHaveText (['Orange', 'Grape']);

  
});