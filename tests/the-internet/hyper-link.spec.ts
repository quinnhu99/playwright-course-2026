import { test, expect } from './fixrtures/the-internet.fixture';

test('verify status code links', async ({ hyperlinkPage }) => {
  await hyperlinkPage.goto();

  await hyperlinkPage.clickOnElementWithText('200');
  expect(await hyperlinkPage.getCurrentUrl()).toContain('status_codes/200');
  expect (await hyperlinkPage.getContent()).toContain('200 status code');
  await hyperlinkPage.clickOnElementWithText('here');

  await hyperlinkPage.clickOnElementWithText('301');
  expect(await hyperlinkPage.getCurrentUrl()).toContain('status_codes/301');
  expect(await hyperlinkPage.getContent()).toContain('301 status code');
  await hyperlinkPage.clickOnElementWithText('here');

  await hyperlinkPage.clickOnElementWithText('404');
  expect(await hyperlinkPage.getCurrentUrl()).toContain('status_codes/404');
  expect(await hyperlinkPage.getContent()).toContain('404 status code');
  await hyperlinkPage.clickOnElementWithText('here');

  await hyperlinkPage.clickOnElementWithText('500');
  expect(await hyperlinkPage.getCurrentUrl()).toContain('status_codes/500');
  expect(await hyperlinkPage.getContent()).toContain('500 status code');
  await hyperlinkPage.clickOnElementWithText('here');
});