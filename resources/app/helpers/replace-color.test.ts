import { replaceColor } from "./replace-color";

describe('replaceColor', () => {
    const colorToReplace = '#ffffff';
    const targetColor = '#000000';

    test('should remove the colorToReplace from the colors', () => { 
        const colors = {
            [colorToReplace]: ['whiteLayer'],
            [targetColor]: ['blackLayer'],
        }

        expect(colors[colorToReplace]).toBeDefined();

        const updatedColors = replaceColor(colors, colorToReplace, targetColor);
        
        expect(updatedColors[colorToReplace]).toBeUndefined();
    })

    test('if targetColor already exist, should append it the colorToReplace layers', () => {
        const colors = {
            [colorToReplace]: ['whiteLayer'],
            [targetColor]: ['blackLayer'],
        }

        expect(replaceColor(colors, colorToReplace, targetColor)).toEqual({
            [targetColor]: ['blackLayer', 'whiteLayer'],
        })
    });

    test('if targetColor does not exist, should add it with the colorToReplace layers', () => {
        const colors = {
            [colorToReplace]: ['whiteLayer'],
        }

        expect(replaceColor(colors, colorToReplace, targetColor)).toEqual({
            [targetColor]: ['whiteLayer'],
        })
    })

    test('should throw an exception if colorToReplace is not in colors', () => {
        const colors = {}
        const error = `colorToReplace ${colorToReplace} not present in colors ${JSON.stringify(colors, null, 2)}`
        
        expect(() => replaceColor({}, colorToReplace, targetColor)).toThrowError(error);
    })
});