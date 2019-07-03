export interface Layer {
    type: string;
    id: string;
    frame: {x: number; y: number; width: number; height: number; };
    name: string;
    selected: boolean;
    sharedStyleId: string | null;
    layers?: (Layer & any)[]
}
