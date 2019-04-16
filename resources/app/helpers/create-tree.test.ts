import { mapColorMapToColors } from './create-tree';

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
        {
          name: 'Rectangle1',
          parents: [{ name: 'Page1' }, { name: 'Artboard1' }],
        },
        {
          name: 'Rectangle2',
          parents: [{ name: 'Page2' }, { name: 'Artboard2' }],
        },
      ],
    };

    output = [
      {
        color: 'red',
        layers: [
          {
            name: 'Page1',
            children: [
              {
                name: 'Artboard1',
                children: [{ name: 'Rectangle1' }],
              },
            ],
          },
          {
            name: 'Page2',
            children: [
              {
                name: 'Artboard2',
                children: [{ name: 'Rectangle2' }],
              },
            ],
          },
        ],
      },
    ];
  });

    test('transform color map with common parents to an array of colors with grouped layers', () => {
      input = {
        red: [{
          name: 'Rectangle1',
          parents: [{ name: 'Page' }, { name: 'Artboard' }],
        },
        {
          name: 'Rectangle2',
          parents: [{ name: 'Page' }, { name: 'Artboard' }],
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
                name: 'Artboard',
                children: [{ name: 'Rectangle1' }, { name: 'Rectangle2' }],
              },
            ],
          },
        ],
      },
    ];
  });
});
