import { mapColorMapToColors, InputLayer } from './create-tree';

const createInputLayer = (name: string, parentNames: string[] = []): InputLayer => {
  const inputLayer = {
    id: `id-${name}`,
    name: name,
    type: 'ShapePath',
    colorType: 'fill',
    parents: [] as any[]
  }

  if (parentNames.length) {
    parentNames.forEach(parentName => {
      const parent = { id: `id-${parentName}`, name: parentName, type: 'ShapePath'};
      inputLayer.parents.push(parent);
    })
  }

  return inputLayer;
}

describe('createTreeStructure', () => {
  let input: any;
  let output: any;
  afterEach(() => {
    expect(mapColorMapToColors(input)).toEqual(output);
  });

  test('transform color map with no layers to an array of colors with no layers', () => {
    input = {
      red: [],
      yellow: [],
    };

    output = [{ color: 'red', layers: [] }, { color: 'yellow', layers: [] }];
  });

  test('transform color map with no parents to an array of colors with a layer without children', () => {
    input = {
      red: [
        {
          name: 'Rectangle1',
        },
      ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            name: 'Rectangle1',
          },
        ],
      },
    ];
  });

  test('transform color map with parents to an array of colors with layers', () => {
    input = {
      red: [
        {
          name: 'Rectangle',
          parents: [{ name: 'Page' }, { name: 'Group' }],
        },
      ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            name: 'Page',
            children: [
              {
                name: 'Group',
                children: [{ name: 'Rectangle' }],
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
        createInputLayer('Rectangle1', ['Page1', 'Artboard1']),
        createInputLayer('Rectangle2', ['Page2', 'Artboard2']),
      ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            name: 'Page1',
            id: 'id-Page1',
            type: 'ShapePath',
            children: [
              {
                name: 'Artboard1',
                id: 'id-Artboard1',
                type: 'ShapePath',
                children: [{id: 'id-Rectangle1', name: 'Rectangle1', type: 'ShapePath', colorType: 'fill', }],
              },
            ],
          },
          {
            id: 'id-Page2', 
            name: 'Page2',
            type: 'ShapePath',
            children: [
              {
                id: 'id-Artboard2',
                name: 'Artboard2',
                type: 'ShapePath',
                children: [
                  { id: 'id-Rectangle2', name: 'Rectangle2', type: 'ShapePath', colorType: 'fill'}
                ],
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
          createInputLayer('Rectangle1', ['Page', 'Artboard']),
          createInputLayer('Rectangle2', ['Page', 'Artboard']),
        ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            name: 'Page',
            id: 'id-Page',
            type: 'ShapePath',
            children: [
              {
                name: 'Artboard',
                id: 'id-Artboard',
                type: 'ShapePath',
                children: [
                  {id: 'id-Rectangle1', name: 'Rectangle1', type: 'ShapePath', colorType: 'fill' },
                  {id: 'id-Rectangle2', name: 'Rectangle2', type: 'ShapePath', colorType: 'fill' }
                ],
              },
            ],
          },
        ],
      },
    ];
  });
});
