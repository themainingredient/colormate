import BrowserWindow from 'sketch-module-web-view';
import sketch, { UI } from 'sketch'; // eslint-disable-line import/no-unresolved
import { trackAppStart } from './helpers/analytics.ts';
import { replaceColorInLayers } from './helpers/replace-color-in-layers.ts';
import getColors from './get-colors.ts';
import webview from '../resources/webview.html';

export default function () {
  const options = {
    identifier: 'unique.id',
    width: 320,
    height: 534,
    show: true,
    resizable: false,
    alwaysOnTop: true,
    acceptsFirstMouse: true,
  };

  const browserWindow = new BrowserWindow(options);

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
  });

  const { webContents } = browserWindow;

  // add a handler for a call from web content's javascript
  webContents.on('getColors', (s) => {
    const colors = getColors();
    UI.message(s);
    webContents.executeJavaScript(`sendUsedColors(${JSON.stringify(colors)})`)
      .catch(console.error); // eslint-disable-line no-console
  });

  webContents.on('selectLayer', (layerID) => {
    const document = sketch.getDocuments()[0];
    const sketchLayer = document.getLayerWithID(layerID);
    document.centerOnLayer(sketchLayer);
    document.selectedLayers = [sketchLayer];
  });

  webContents.on('replaceColor', ({
    message, colorToReplace, targetColor, layerIds,
  }) => {
    if (colorToReplace.toLowerCase() === targetColor.toLowerCase()) {
      return;
    }

    UI.message(message);
    replaceColorInLayers(colorToReplace, targetColor, layerIds);

    const args = { colorToReplace, targetColor };
    webContents.executeJavaScript(`replaceColor(${JSON.stringify(args)})`);
  });

  webContents.on('openUrlInBrowser', (url) => {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url)); // eslint-disable-line no-undef
  });

  webContents.on('closeWindow', () => {
    browserWindow.close();
  });

  browserWindow.loadURL(webview);

  trackAppStart();
}
