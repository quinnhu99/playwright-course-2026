import { test, expect } from './fixrtures/the-internet.fixture';

test('verify checkbox functionality', async ({ checkboxPage }) => {
  await checkboxPage.goto();

  await checkboxPage.checkCheckbox(0);
  expect(await checkboxPage.isCheckboxChecked(0)).toBe(true);

  await checkboxPage.checkCheckbox(1);
  expect(await checkboxPage.isCheckboxChecked(1)).toBe(true);
});