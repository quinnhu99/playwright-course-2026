import {test as base} from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CheckboxPage } from '../pages/checkbox.page';
import { DropdownPage } from '../pages/dropdown.page';
import { TablePage } from '../pages/table.page';
import { HyperlinkPage } from '../pages/hyperlink.page';


type TheInternetFixtures = {
  loginPage: LoginPage,
  checkboxPage: CheckboxPage,
  dropdownPage: DropdownPage;
  tablePage: TablePage;
  hyperlinkPage: HyperlinkPage;
}

export const test = base.extend<TheInternetFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);  
    await use(loginPage);
  },
  checkboxPage: async ({ page }, use) => {
    const checkboxPage = new CheckboxPage(page);  
    await use(checkboxPage);
  },
  dropdownPage: async ({ page }, use) => {
    const dropdownPage = new DropdownPage(page);  
    await use(dropdownPage);
  },
  tablePage: async ({ page }, use) => {  
    const tablePage = new TablePage(page);
    await use(tablePage);
  },
  hyperlinkPage: async ({ page }, use) => {
    const hyperlinkPage = new HyperlinkPage(page);
    await use(hyperlinkPage);
  } 
});

export { expect } from '@playwright/test';