import getColors from './get-colors';
import getColorsResult from './__mocks__/getColorsResult.json';
import TreeMock from './__mocks__/MockSketchDocument.json';
import * as fromGetColorHelper from './helpers/get-colors';
import { getSelectedDocument } from 'sketch';

jest.mock('sketch', () => ({
  getSelectedDocument: jest.fn()
}), { virtual: true });

describe('getColors', () => {
  describe('if layers are not selected', () => {
    beforeAll(() => {

      (getSelectedDocument as jest.Mock).mockImplementation(() => TreeMock);
    })

    test('returns an object with all the colors that were found', () => {
      expect(getColors()).toEqual(getColorsResult);
    });
  })

  describe('if layers are selected', () => {
    const selectedLayers = {
      isEmpty: false,
      layers: [],
    }

    beforeAll(() => {
      (getSelectedDocument as jest.Mock).mockImplementation(() => ({
        selectedLayers
      }));
    })

    test('should call getPagesWithSelectedLayers with the selectedLayers', () => {
      const spy = jest.spyOn(fromGetColorHelper, 'getPagesWithSelectedLayers');

      getColors();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(selectedLayers);

      spy.mockRestore();
    });
  });
});

jest.unmock('sketch');
