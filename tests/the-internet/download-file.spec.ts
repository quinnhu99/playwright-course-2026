import {test, expect} from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('verify the download file functionality', async({page}) => {   
  await page.goto('https://the-internet.herokuapp.com/download');
  
  const downloadDir = path.resolve(__dirname, '../resources/download');
    
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#content').getByRole('link', { name: 'logo.png', exact: true }).click()
  ]);
  
  const downloadPath = path.join(downloadDir, download.suggestedFilename());
  await download.saveAs(downloadPath);
  expect(fs.existsSync(downloadPath)).toBeTruthy();
  expect(downloadPath).toContain('logo.png');
});

