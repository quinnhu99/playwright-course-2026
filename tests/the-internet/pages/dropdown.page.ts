import {expect, type Locator, type Page} from '@playwright/test';

export class DropdownPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  } 

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/dropdown');
  }   

  async selectOptionByValue(value: string) {
    await this.page.selectOption('#dropdown', { value });
  } 

  async getSelectedOption() {
    return await this.page.locator('#dropdown > option:checked').textContent();
  }
}