import { ColorWithLayers } from '../models/color-with-layers.model';
import { SketchColorMap, SketchColorMapLayer, SketchColorMapLayerParent } from '../models/sketch-color-map.model';
import { transformSketchColorMap } from './transform-sketch-colormap';
import { LayerType } from '../../../enums/layer-type.enum';
import { ColorType } from '../../../enums/color-type.enum';

const createSketchColorMapLayer = (
  name: string,
  type: string,
  parents: { name: string; type: string }[] = [],
): SketchColorMapLayer => {
  const inputLayer = {
    id: `id-${name}`,
    name,
    type,
    colorType: ColorType.fill,
    parents: [] as SketchColorMapLayerParent[],
  };

  if (parents.length) {
    parents.forEach(({ name: parentName, type: parentType }) => {
      const parent = { id: `id-${parentName}`, name: parentName, type: parentType };
      inputLayer.parents.push(parent);
    });
  }

  return inputLayer;
};

describe('createTreeStructure', () => {
  let input: SketchColorMap;
  let output: ColorWithLayers[];

  afterEach(() => {
    expect(transformSketchColorMap(input)).toEqual(output);
  });

  test('transform color map with no layers to an array of colors with no layers', () => {
    input = { red: [], yellow: [] };

    output = [{ color: 'red', layers: [] }, { color: 'yellow', layers: [] }];
  });

  test('transform color map with no parents to an array of colors with a layer without children', () => {
    input = {
      red: [createSketchColorMapLayer('Rectangle1', 'ShapePath')],
    };

    output = [
      {
        color: 'red',
        layers: [{
          id: 'id-Rectangle1', name: 'Rectangle1', type: 'ShapePath', colorType: ColorType.fill,
        }],
      },
    ];
  });

  test('transform color map with parents to an array of colors with layers', () => {
    input = {
      red: [
        createSketchColorMapLayer(
          'Rectangle',
          'ShapePath',
          [
            { name: LayerType.page, type: LayerType.page },
            { name: LayerType.group, type: LayerType.group },
          ]),
      ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            id: 'id-Page',
            name: LayerType.page,
            type: LayerType.page,
            children: [
              {
                id: 'id-Group',
                name: LayerType.group,
                type: LayerType.group,
                children: [{
                  id: 'id-Rectangle', name: 'Rectangle', type: 'ShapePath', colorType: ColorType.fill,
                }],
              },
            ],
          },
        ],
      },
    ];
  });

  test('transform color map with different parents to an array of colors with layers', () => {
    input = {
      red: [
        createSketchColorMapLayer('Rectangle1', 'ShapePath', [
          { name: 'Page1', type: LayerType.page },
          { name: 'Artboard1', type: LayerType.artboard },
        ]),
        createSketchColorMapLayer('Rectangle2', 'ShapePath', [
          { name: 'Page2', type: LayerType.page },
          { name: 'Artboard2', type: LayerType.artboard },
        ]),
      ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            name: 'Page1',
            id: 'id-Page1',
            type: LayerType.page,
            children: [
              {
                name: 'Artboard1',
                id: 'id-Artboard1',
                type: LayerType.artboard,
                children: [{
                  id: 'id-Rectangle1', name: 'Rectangle1', type: 'ShapePath', colorType: ColorType.fill,
                }],
              },
            ],
          },
          {
            id: 'id-Page2',
            name: 'Page2',
            type: LayerType.page,
            children: [
              {
                id: 'id-Artboard2',
                name: 'Artboard2',
                type: LayerType.artboard,
                children: [{
                  id: 'id-Rectangle2', name: 'Rectangle2', type: 'ShapePath', colorType: ColorType.fill,
                }],
              },
            ],
          },
        ],
      },
    ];
  });

  test('transform color map with common parents to an array of colors with grouped layers', () => {
    input = {
      red: [
        createSketchColorMapLayer('Rectangle1', 'ShapePath', [
          { name: LayerType.page, type: LayerType.page },
          { name: LayerType.artboard, type: LayerType.artboard },
        ]),
        createSketchColorMapLayer('Rectangle2', 'ShapePath', [
          { name: LayerType.page, type: LayerType.page },
          { name: LayerType.artboard, type: LayerType.artboard },
        ]),
      ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            name: LayerType.page,
            id: 'id-Page',
            type: LayerType.page,
            children: [
              {
                name: LayerType.artboard,
                id: 'id-Artboard',
                type: LayerType.artboard,
                children: [
                  {
                    id: 'id-Rectangle1', name: 'Rectangle1', type: 'ShapePath', colorType: ColorType.fill,
                  },
                  {
                    id: 'id-Rectangle2', name: 'Rectangle2', type: 'ShapePath', colorType: ColorType.fill,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  });

  test('transform color map with partially common parents to an array of colors with grouped layers', () => {
    input = {
      red: [
        createSketchColorMapLayer('Rectangle2', 'ShapePath', [
          { name: LayerType.page, type: LayerType.page },
          { name: LayerType.artboard, type: LayerType.artboard },
        ]),
        createSketchColorMapLayer('Rectangle1', 'ShapePath', [
          { name: LayerType.page, type: LayerType.page },
          { name: LayerType.artboard, type: LayerType.artboard },
          { name: LayerType.group, type: LayerType.group },
        ]),
        createSketchColorMapLayer('Rectangle3', 'ShapePath', [
          { name: LayerType.page, type: LayerType.page },
          { name: LayerType.artboard, type: LayerType.artboard },
          { name: LayerType.group, type: LayerType.group },
        ]),
      ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            name: LayerType.page,
            id: 'id-Page',
            type: LayerType.page,
            children: [
              {
                name: LayerType.artboard,
                id: 'id-Artboard',
                type: LayerType.artboard,
                children: [
                  {
                    id: 'id-Rectangle2',
                    name: 'Rectangle2',
                    type: 'ShapePath',
                    colorType: ColorType.fill,
                  },
                  {
                    name: LayerType.group,
                    id: 'id-Group',
                    type: LayerType.group,
                    children: [
                      {
                        id: 'id-Rectangle1',
                        name: 'Rectangle1',
                        type: 'ShapePath',
                        colorType: ColorType.fill,
                      },
                      {
                        id: 'id-Rectangle3',
                        name: 'Rectangle3',
                        type: 'ShapePath',
                        colorType: ColorType.fill,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  });
});
