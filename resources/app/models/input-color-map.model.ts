export interface InputColorMap {
    [hexColor: string]: InputColorMapLayer[]
}

export interface InputColorMapLayer {
    id: string;
    name: string;
    type: string;
    colorType: string;
    parents: InputColorMapLayerParent[];
}

export interface InputColorMapLayerParent {
    id: string;
    name: string;
    type: string;
}