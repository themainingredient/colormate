import getColors from './get-colors';
import getColorsResult from './__mocks__/getColorsResult.json';

// TODO: failing test, debug!
describe('get-colors', () => {
  test.skip('returns an object with all the colors that were found', () => {
    expect(getColors()).toEqual(getColorsResult);
  });
});
