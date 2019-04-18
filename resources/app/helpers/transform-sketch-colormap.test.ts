import { ColorWithLayers } from '../models/color-with-layers.model';
import { SketchColorMap, SketchColorMapLayer, SketchColorMapLayerParent } from '../models/sketch-color-map.model';
import { transformSketchColorMap } from './transform-sketch-colormap';

const createInputLayer = (
  name: string,
  type: string,
  parentNames: { name: string; type: string }[] = [],
): SketchColorMapLayer => {
  const inputLayer = {
    id: `id-${name}`,
    name,
    type,
    colorType: 'fill',
    parents: [] as SketchColorMapLayerParent[],
  };

  if (parentNames.length) {
    parentNames.forEach(({ name, type }) => {
      const parent = { id: `id-${name}`, name, type };
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
      red: [createInputLayer('Rectangle1', 'ShapePath')],
    };

    output = [
      {
        color: 'red',
        layers: [{
          id: 'id-Rectangle1', name: 'Rectangle1', type: 'ShapePath', colorType: 'fill',
        }],
      },
    ];
  });

  test('transform color map with parents to an array of colors with layers', () => {
    input = {
      red: [
        createInputLayer('Rectangle', 'ShapePath', [{ name: 'Page', type: 'Page' }, { name: 'Group', type: 'Group' }]),
      ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            id: 'id-Page',
            name: 'Page',
            type: 'Page',
            children: [
              {
                id: 'id-Group',
                name: 'Group',
                type: 'Group',
                children: [{
                  id: 'id-Rectangle', name: 'Rectangle', type: 'ShapePath', colorType: 'fill',
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
        createInputLayer('Rectangle1', 'ShapePath', [
          { name: 'Page1', type: 'Page' },
          { name: 'Artboard1', type: 'Artboard' },
        ]),
        createInputLayer('Rectangle2', 'ShapePath', [
          { name: 'Page2', type: 'Page' },
          { name: 'Artboard2', type: 'Artboard' },
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
            type: 'Page',
            children: [
              {
                name: 'Artboard1',
                id: 'id-Artboard1',
                type: 'Artboard',
                children: [{
                  id: 'id-Rectangle1', name: 'Rectangle1', type: 'ShapePath', colorType: 'fill',
                }],
              },
            ],
          },
          {
            id: 'id-Page2',
            name: 'Page2',
            type: 'Page',
            children: [
              {
                id: 'id-Artboard2',
                name: 'Artboard2',
                type: 'Artboard',
                children: [{
                  id: 'id-Rectangle2', name: 'Rectangle2', type: 'ShapePath', colorType: 'fill',
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
        createInputLayer('Rectangle1', 'ShapePath', [
          { name: 'Page', type: 'Page' },
          { name: 'Artboard', type: 'Artboard' },
        ]),
        createInputLayer('Rectangle2', 'ShapePath', [
          { name: 'Page', type: 'Page' },
          { name: 'Artboard', type: 'Artboard' },
        ]),
      ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            name: 'Page',
            id: 'id-Page',
            type: 'Page',
            children: [
              {
                name: 'Artboard',
                id: 'id-Artboard',
                type: 'Artboard',
                children: [
                  {
                    id: 'id-Rectangle1', name: 'Rectangle1', type: 'ShapePath', colorType: 'fill',
                  },
                  {
                    id: 'id-Rectangle2', name: 'Rectangle2', type: 'ShapePath', colorType: 'fill',
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
        createInputLayer('Rectangle2', 'ShapePath', [
          { name: 'Page', type: 'Page' },
          { name: 'Artboard', type: 'Artboard' },
        ]),
        createInputLayer('Rectangle1', 'ShapePath', [
          { name: 'Page', type: 'Page' },
          { name: 'Artboard', type: 'Artboard' },
          { name: 'Group', type: 'Group' },
        ]),
        createInputLayer('Rectangle3', 'ShapePath', [
          { name: 'Page', type: 'Page' },
          { name: 'Artboard', type: 'Artboard' },
          { name: 'Group', type: 'Group' },
        ]),
      ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            name: 'Page',
            id: 'id-Page',
            type: 'Page',
            children: [
              {
                name: 'Artboard',
                id: 'id-Artboard',
                type: 'Artboard',
                children: [
                  {
                    id: 'id-Rectangle2',
                    name: 'Rectangle2',
                    type: 'ShapePath',
                    colorType: 'fill',
                  },
                  {
                    name: 'Group',
                    id: 'id-Group',
                    type: 'Group',
                    children: [
                      {
                        id: 'id-Rectangle1',
                        name: 'Rectangle1',
                        type: 'ShapePath',
                        colorType: 'fill',
                      },
                      {
                        id: 'id-Rectangle3',
                        name: 'Rectangle3',
                        type: 'ShapePath',
                        colorType: 'fill',
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
