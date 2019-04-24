// these interfaces are not complete
// add a prop if needed (https://developer.sketch.com/reference/api/)
declare module 'sketch' {
    export enum LayerType {
        Document = 'Document',
        Page = 'Page',
        ShapePath = 'ShapePath',
    }

    export interface Layer {
        id: string;
        type: LayerType;
        name: string;
        parent: Group | Document
      }

    export interface Group extends Layer {
        layers?: Layer[];
        style: Style;
    }

    export interface Page extends Group {

    }

    export interface Document {
        id: string;
        pages: Page[];
        selectedPage: Page;
        selectedLayers: Selection;
        type: LayerType
    }

    export interface Style {
        opacity: number;
        textColor: string;
    }

    export interface Selection {
        layers: Layer[];
        readonly length: number;
        readonly isEmpty: boolean;
    }

    export function getSelectedDocument(): Document

    export class Settings {
        static globalSettingForKey(kUUIDKey: string): string | void
        static setGlobalSettingForKey(uuid: any, kUUIDKey: string): void
    }
}

declare var NSUUID: any;
declare var NSURLSession: any;
declare var NSURL: any;
declare var NSWorkspace: any;
