// import { test, expect } from '@playwright/test';
// import path from 'path';
// import fs from 'fs';

// test('download a file', async ({ page }) => {
//   await page.goto('https://the-internet.herokuapp.com/download');

//   const [download] = await Promise.all([
//     page.waitForEvent('download'),
//     page.getByRole('link', { name: 'Image.PNG', exact: true }).click()
//   ]);
//   const filePath = path.join(__dirname, '../resources/download', download.suggestedFilename());
//   await download.saveAs(filePath);
  
//   expect(fs.existsSync(filePath)).toBeTruthy();
//   expect(filePath).toContain('Image.PNG');
// });

// test('download multiple files', async ({ page }) => {
//   await page.goto('https://the-internet.herokuapp.com/download');
//   const fileName = ['testfile1.pdf', 'Jpeg_with_exif.jpeg', 'TestData.xlsx'];

//   for (const name of fileName) {
//     const [download] = await Promise.all([
//       page.waitForEvent('download'),
//       page.getByRole('link', { name: name, exact: true }).click()
//     ]);

//     const filePath = path.join(__dirname, '../resources/download', download.suggestedFilename());
//     await download.saveAs(filePath);

//     expect(fs.existsSync(filePath)).toBeTruthy();
//     expect(filePath).toContain(name);
//   }
// });
