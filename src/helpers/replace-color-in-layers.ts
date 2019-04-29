import sketch from 'sketch';

// TODO: test
export const replaceColorInLayers = (colorToReplace: string, targetColor: string, layerIds: string[]): void => {
    const doc = sketch.getSelectedDocument();

    layerIds.forEach((id) => {
        const layer = doc.getLayerWithID(id);
        if (layer) {
            
            const style = layer.style;

            style.fills.forEach((fill) => {
                if (fill.color === colorToReplace) {
                    fill.color = targetColor;
                }
            });

            if (style.textColor === colorToReplace) {
                style.textColor = targetColor;
            }

            style.borders.forEach(border => {
                if (border.color === colorToReplace) {
                    border.color = targetColor
                }
            })
        } else {
            const msg = `Layer with ID ${id} not found!`;
            throw new Error(msg);
        }
    });
}