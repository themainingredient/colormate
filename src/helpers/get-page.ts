import { Page, Layer } from 'sketch';
import { LayerType } from '../../enums/layer-type.enum';

export const getPage = (layer: Layer): Page => {
    if (layer.type === LayerType.page) {
        return layer;
    }

    if (!layer.parent) {
        throw new Error(`Layer is not child on any page! ${JSON.stringify(layer, null, 2)}`);
    }

    return getPage(layer.parent as Layer);
}