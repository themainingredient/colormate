import { mapColorMapToColors } from './create-tree';

describe('createTreeStructure', () => {
    let input: any;
    let output: any;
    afterEach(() => { expect(mapColorMapToColors(input)).toEqual(output); });

    test('transform colors object to an array', () => {
      input = {
        red: [],
        yellow: [],
      };

      output = [
        { color: 'red', layers: [] },
        { color: 'yellow', layers: [] },
      ];
    });

    test('should convert a basic tree', () => {
      input = {
        red: [{
          name: 'Rectangle1',
        }],
      };

      output = [{
        color: 'red',
        layers: [{
          name: 'Rectangle1',
        }],
      }];
    });

    test.only('should convert a tree with one parent', () => {
      input = {
        red: [{
          name: 'Rectangle1',
          parents: [
            { name: 'Page' },
          ],
        }],
      };

      output = [{
        color: 'red',
        layers: [
          {
            name: 'Page',
            children: [
              { name: 'Rectangle1' },
            ],
          },
        ],
      }];
    });

    test('should convert a tree with 1 layer with 2 parents', () => {
      input = {
        red: [{
          name: 'Rectangle1',
          parents: [
            { name: 'Page' },
            { name: 'Artboard' },
          ],
        }],
      };

      output = [{
        color: 'red',
        layers: [
          {
            name: 'Page',
            children: [{
              name: 'Artboard',
              children: [
                { name: 'Rectangle1' },
              ],
            }],
          },
        ],
      }];
    });

    test('should convert a tree with 2 layers with different parents', () => {
      input = {
        red: [{
          name: 'Rectangle1',
          parents: [
            { name: 'Page' },
            { name: 'Artboard' },
          ],
        }, {
          name: 'Rectangle2',
          parents: [
            { name: 'Page2' },
            { name: 'Artboard2' },
          ],
        }],
      };

      output = [{
        color: 'red',
        layers: [
          {
            name: 'Page',
            children: [{
              name: 'Artboard',
              children: [
                { name: 'Rectangle1' },
              ],
            }],
          },
          {
            name: 'Page2',
            children: [{
              name: 'Artboard2',
              children: [
                { name: 'Rectangle2' },
              ],
            }],
          },
        ],
      }];
    });

    test.skip('should convert a tree with 2 layers with the same parents', () => {
      input = {
        red: [{
          name: 'Rectangle1',
          parents: [
            { name: 'Page' },
            { name: 'Artboard' },
          ],
        }, {
          name: 'Rectangle2',
          parents: [
            { name: 'Page' },
            { name: 'Artboard' },
          ],
        }],
      };

      output = [{
        color: 'red',
        layers: [
          {
            name: 'Page',
            children: [{
              name: 'Artboard',
              children: [
                { name: 'Rectangle1' },
                { name: 'Rectangle2' },
              ],
            }],
          },
        ],
      }];
    });
  });