import {test, expect} from '@playwright/test';

test.beforeEach(async ({page})=> {
  await page.goto ('https://the-internet.herokuapp.com/javascript_alerts');
})

test ('js alert', async ({page})=> {
  await page.getByRole('button', { name: 'Click for JS Alert' }).click();
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS Alert');
    await dialog.accept();
  });

  await expect (page.locator('#result')).toHaveText('You successfully clicked an alert');
});

test ('js confirm => OK', async ({page}) => {
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS Confirm');
    await dialog.accept('OK');
  });
  await page.getByRole('button', {name: 'Click for JS Confirm'}).click();

  await expect (page.locator('#result')).toHaveText('You clicked: Ok');
});

test ('js confirm => cancel', async ({page}) => {
  await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
  page.on('dialog', async diolog => {{
    expect(diolog.message()).toBe('I am a JS Confirm');
    await diolog.dismiss();
  }});

  await expect (page.locator('#result')).toHaveText('You clicked: Cancel');
});