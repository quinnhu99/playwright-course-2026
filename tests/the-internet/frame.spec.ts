import {test, expect} from '@playwright/test';

test('verify text of frame', async({page})=> {
  await page.goto('https://the-internet.herokuapp.com/nested_frames');

  const frameTop = page.frameLocator('frame[name="frame-top"]');

  await expect (frameTop.frameLocator('frame[name="frame-left"]')
  .locator('body')).toHaveText('LEFT');

  await expect (frameTop.frameLocator('frame[name="frame-middle"]')
    .locator('#content')).toHaveText('MIDDLE');

  await expect (frameTop.frameLocator('frame[name="frame-right"]')
    .locator('body')).toHaveText('RIGHT');

  await expect (page.frameLocator('frame[name="frame-bottom"]')
    .locator ('body')).toHaveText('BOTTOM')

});