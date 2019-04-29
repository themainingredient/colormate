import sketch from 'sketch';

export const replaceColorInLayers = (colorToReplace: string, targetColor: string, layerIds: string[]): void => {
    const doc = sketch.getSelectedDocument();

    layerIds.forEach((id) => {
        const layer = doc.getLayerWithID(id);
        if (layer) {
            //TODO: check what need to be changed (e.g. border)
            layer.style.fills.forEach((fill) => {
                fill.color = targetColor;
            });
        } else {
            const msg = `Layer with ID ${id} not found!`;
            throw new Error(msg);
        }
    });
}