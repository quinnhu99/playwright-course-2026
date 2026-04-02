import {expect, type Locator, type Page} from '@playwright/test';

export class TablePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/tables');
  }

  async getTableData(){
    const dueAmounts = await this.page.locator('#table1 tbody tr td:nth-child(4)').allTextContents();
    const numbers = dueAmounts.map(amount => parseFloat(amount.replace('$', '')));
    return numbers;
  }

  async getMaxValue(numbers: number[]) {
    return Math.max(...numbers);
  }

  async getMinValue(numbers: number[]) {
    return Math.min(...numbers);
  }

  async getIndexes(numbers: number[], minValue: number) {
    const indexs =  numbers
      .map((amount,i)=> amount === minValue ? i : -1)
      .filter(i => i !== -1);
  return indexs;
  }

 async getFullNameByIndex(index: number[]) {
  const name = [];
  for (const i of index) {  
    const firstName = await this.page.locator(`#table1 tbody tr:nth-child(${i+1}) td:nth-child(1)`).textContent();
    const lastName = await this.page.locator(`#table1 tbody tr:nth-child(${i+1}) td:nth-child(2)`).textContent();
    name.push(`${firstName} ${lastName}`);
  }
  return name;
  }
}   