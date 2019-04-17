export interface ColorWithLayers {
    color: string;
    children: Layer[]; //TODO: rename to layers
}

export interface Layer {
    id: string;
    name: string;
    type: string;
    colorType?: string;
    children?: Layer[];
}