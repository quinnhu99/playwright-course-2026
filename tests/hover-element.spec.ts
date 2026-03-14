import {test, expect} from '@playwright/test';

test.beforeEach(async({page})=> {
  await page.goto('https://the-internet.herokuapp.com/hovers');
});

test('hover 1st image', async({page})=> {
  const figure = page.locator('.figure').first();
  await figure.hover();
  await expect(figure.locator('.figcaption')).toBeVisible();
  await expect(figure).toContainText('name: user1');
});

test('hover middle image', async({page})=> {
  const figure = page.locator('.figure').nth(1);
  await figure.hover();
  await expect(figure.locator('.figcaption')).toBeVisible();
  await expect(figure).toContainText('name: user2');
});

test('hover the last image', async({page})=>{
  const figure = page.locator('.figure').nth(2);
  await figure.hover();
  await expect(figure.locator('.figcaption')).toBeVisible();
  await expect(figure).toContainText('name: user3');
});

test('verify all users on hover', async({page})=> {
  const users =['user1', 'user2', 'user3'];
  for (let i = 0; i<users.length; i++){
    const figure = page.locator('.figure').nth(i);
    await figure.hover();
    await expect(figure.locator('.figcaption')).toBeVisible();
    await expect(figure.locator('h5')).toHaveText(`name: ${users[i]}`);
  }
});
  