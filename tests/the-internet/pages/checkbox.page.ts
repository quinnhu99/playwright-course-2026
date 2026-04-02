import {expect,type Locator, type Page} from '@playwright/test';

export class CheckboxPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/checkboxes');
  }

  async checkCheckbox(index: number) {
    await this.page.locator('input[type="checkbox"]').nth(index).check();
  }

  async uncheckCheckbox(index: number) {
    await this.page.locator('input[type="checkbox"]').nth(index).uncheck();
  }

  async isCheckboxChecked(index: number) {
    return await this.page.locator('input[type="checkbox"]').nth(index).isChecked();
  }
}