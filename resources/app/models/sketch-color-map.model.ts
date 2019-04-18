export interface SketchColorMap {
    [hexColor: string]: SketchColorMapLayer[]
}

export interface SketchColorMapLayer {
    id: string;
    name: string;
    type: string;
    colorType: string;
    parents: SketchColorMapLayerParent[];
}

export interface SketchColorMapLayerParent {
    id: string;
    name: string;
    type: string;
}