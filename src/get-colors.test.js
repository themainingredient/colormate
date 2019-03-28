import getColors from './get-colors';
import getColorsResult from './__mocks__/getColorsResult.json';

describe('get-colors', () => {
  test('returns an object with all the colors that were found', () => {
    expect(getColors()).toEqual(getColorsResult);
  });
});
