export interface ColorWithLayers {
    color: string;
    layers: Layer[];
}

export interface Layer {
    id: string;
    name: string;
    type: string;
    colorType?: string;
    children?: Layer[];
}