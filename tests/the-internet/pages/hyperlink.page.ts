import {expect, type Locator, type Page} from '@playwright/test';

export class HyperlinkPage {
  readonly page: Page; 

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/status_codes');
  } 

  async clickOnElementWithText(text: string) {
    await this.page.getByRole('link', { name: text }).click();
  } 

  async getCurrentUrl() {
    return this.page.url();
  }

  async getContent() {
    return this.page.locator(`#content > div.example > p`).textContent();
  }
}