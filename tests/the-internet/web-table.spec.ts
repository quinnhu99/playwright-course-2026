import { test, expect } from '@playwright/test';

test ('verify fullname of maxdue person', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/tables');

  const dueAmounts = await page.locator('#table1 tbody tr td:nth-child(4)').allTextContents();
  //console.log(dueAmounts);
  const numbers = dueAmounts.map(amount => parseFloat(amount.replace('$', '')));
  //console.log(numbers)
  const maxValue = Math.max(...numbers);
  //console.log(maxValue);
  const index = numbers.indexOf(maxValue);
  //console.log(index);
  const firstName = await page.locator(`#table1 tbody tr:nth-child(${index+1}) td:nth-child(1)`).textContent();
  //console.log (firstName)
  const lastName = await page.locator(`#table1 tbody tr:nth-child(${index+1}) td:nth-child(2)`).textContent();
  //console.log (lastName)
  expect(`${firstName} ${lastName}`).toBe('Doe Jason');

});

test ('verify fullname of mindue person(s)', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/tables');

  const dueAmounts = await page.locator('#table1 tbody tr td:nth-child(4)').allTextContents();
  //console.log(dueAmounts);
  const numbers = dueAmounts.map(amount => parseFloat(amount.replace('$', '')));
  //console.log(numbers)
  const minValue = Math.min(...numbers);
  //console.log(minValue);
  const indexs =  numbers
  .map((amount,i)=> amount === minValue ? i : -1)
  .filter(i => i !== -1);
  //console.log(indexs);

  const name = [];
  for (const index of indexs) {
    const firstName = await page.locator(`#table1 tbody tr:nth-child(${index+1}) td:nth-child(1)`).textContent();
  //console.log (firstName)
  const lastName = await page.locator(`#table1 tbody tr:nth-child(${index+1}) td:nth-child(2)`).textContent();
  //console.log (lastName)
  name.push(`${firstName} ${lastName}`)
  //console.log (name)
  }
  
  expect(name).toEqual(['Smith John', 'Conway Tim']
);

});