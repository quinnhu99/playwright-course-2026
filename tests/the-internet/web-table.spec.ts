import { test, expect } from './fixrtures/the-internet.fixture';

test ('verify fullname of maxdue person', async({tablePage}) => {
  await tablePage.goto();

  const numbers = await tablePage.getTableData();
  const maxValue = await tablePage.getMaxValue(numbers);
  const index = numbers.indexOf(maxValue);

  expect(await tablePage.getFullNameByIndex([index])).toContain('Doe Jason');
});

test ('verify fullname of mindue person(s)', async ({tablePage}) => {
  await tablePage.goto();

  const numbers = await tablePage.getTableData();
  const minValue = await tablePage.getMinValue(numbers);
  const indexs =  await tablePage.getIndexes(numbers, minValue);

  expect(await tablePage.getFullNameByIndex(indexs)).toEqual(['Smith John', 'Conway Tim']);
});