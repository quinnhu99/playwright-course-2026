import {test, expect} from '@playwright/test';

async function setSliderValue(page, target) {
  const slider = page.locator('input[type="range"]');
  const range = page.locator('#range');
  await slider.focus();
  let value = Number(await range.innerText());
  while (value !== target) {
    if (value < target) await slider.press('ArrowRight');
    else await slider.press('ArrowLeft');
    value = Number(await range.innerText());
  }
  await expect(range).toHaveText(String(target));
}

test('set slider value', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/horizontal_slider');
  await setSliderValue(page, 3.5);
  await setSliderValue(page, 0);
  await setSliderValue(page, 5);
});

