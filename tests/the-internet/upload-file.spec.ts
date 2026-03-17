import {test, expect} from '@playwright/test';
import path from 'path';

test('verify file upload functionality', async({page}) => {
  await page.goto('https://the-internet.herokuapp.com/upload');
  const filePath = path.resolve(__dirname, '../resources/upload/RecordingChat.txt');
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles(filePath);
  await page.getByRole('button', { name: 'Upload' }).click();
  await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
  await expect(page.locator('#uploaded-files')).toHaveText('RecordingChat.txt');
});