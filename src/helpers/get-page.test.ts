
import { Layer } from 'sketch';
import {getPage} from './get-page';
import { LayerType } from '../../enums/layer-type.enum';

describe('getPage', () => {
    test('should return the layer if is a page', () => {
        const layer = {
            type: LayerType.page
        }

        expect(getPage(layer as Layer)).toBe(layer);
    });

    test('should return the first parent page', () => {
        const page = {
            type: LayerType.page,
            parent: {
                type: LayerType.document
            }
        }
        const layer = {
            type: LayerType.shapePath,
            parent: {
                type: LayerType.artboard,
                parent: page
            }
        }

        expect(getPage(layer as Layer)).toBe(page);
    });

    test('should throw an error if the layer has no parent page', () => {
        const layer = {
            type: LayerType.shapePath
        }

        expect(() => getPage(layer as Layer)).toThrow()
    })
});