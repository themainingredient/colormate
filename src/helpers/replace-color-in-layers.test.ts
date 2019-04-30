import { getSelectedDocument } from 'sketch';
import { replaceColorInLayers } from './replace-color-in-layers';

jest.mock('sketch', () => ({
    getSelectedDocument: jest.fn()
  }), {virtual: true});

describe('replaceColorInLayers', () => {
    let layers: any;

    beforeAll(() => {
        (getSelectedDocument as jest.Mock).mockImplementation(() => ({
            getLayerWithID: (id) => layers.find(layer => id === layer.id);
        }));
    })

    beforeEach(() => {
        layers = [
            {id: 'firstMatch', style: {fills: [{color: 'red'}], textColor: 'red', borders: [{color: 'red'}]}},
            {id: 'secondMatch', style: {fills: [{color: 'red'}], textColor: 'red', borders: [{color: 'red'}]}},
            {id: 'noMatch', style: {fills: [{color: 'red'}], textColor: 'red', borders: [{color: 'red'}]}},
        ]
    })

    test('should throw an exception if the layer ID is not found', () => {
        const layerId = 'a';
        expect(() => replaceColorInLayers('#000000', '#ffffff', [layerId])).toThrowError(`Layer with ID ${layerId} not found!`);
    })

    test('should not select the document for the replacement if the colors are the same', () => {
        replaceColorInLayers('#000000', '#000000', ['firstMatch']);
        replaceColorInLayers('#abcdef', '#ABCDEF', ['firstMatch']);

        expect(getSelectedDocument).not.toHaveBeenCalled();
    });

    describe('in all the matching layer ids', () => {
        it('if the colorToReplace match,  should replace the fill, text and borders color', () => {
            replaceColorInLayers('red', 'blue', ['firstMatch', 'secondMatch']);

            expect(layers).toEqual([
                {id: 'firstMatch', style: {fills: [{color: 'blue'}], textColor: 'blue', borders: [{color: 'blue'}]}},
                {id: 'secondMatch', style: {fills: [{color: 'blue'}], textColor: 'blue', borders: [{color: 'blue'}]}},
                {id: 'noMatch', style: {fills: [{color: 'red'}], textColor: 'red', borders: [{color: 'red'}]}},
            ])
        })

        it('if the colorToReplace does not match, should not replace anything', () => {
            const layersBeforeMutation = layers;
            
            replaceColorInLayers('foo', 'blue', ['firstMatch', 'secondMatch']);

            expect(layers).toEqual(layersBeforeMutation);
        })
    })
})

jest.unmock('sketch');