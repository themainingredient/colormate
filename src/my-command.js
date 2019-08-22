import BrowserWindow from 'sketch-module-web-view';
import sketch, { UI, Settings } from 'sketch'; // eslint-disable-line import/no-unresolved
import { browserWindowSize } from '../constants.ts';
import { replaceColorInLayers } from './helpers/replace-color-in-layers.ts';
import getColors from './get-colors.ts';
import webview from '../resources/webview.html';

export default function () {
  const options = {
    identifier: 'unique.id',
    width: browserWindowSize.width,
    height: browserWindowSize.height,
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

  webContents.on('selectLayer', (layerID, idToCenterOn) => {
    const document = sketch.getDocuments()[0];

    const sketchLayer = document.getLayerWithID(layerID);
    const layerToCenterOn = document.getLayerWithID(idToCenterOn);

    document.centerOnLayer(layerToCenterOn);
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

    const args = { colorToReplace, targetColor, layerIds };
    webContents.executeJavaScript(`replaceColor(${JSON.stringify(args)})`);
  });

  webContents.on('openUrlInBrowser', (url) => {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url)); // eslint-disable-line no-undef
  });

  webContents.on('closeWindow', () => {
    browserWindow.close();
  });

  webContents.on('isPopUpVisible', () => {
    let isVisible = Settings.settingForKey('isPopUpVisible');
    if (isVisible === undefined) {
      isVisible = true;
    }
    webContents.executeJavaScript(`isPopUpVisible(${JSON.stringify(isVisible)})`);
  });

  webContents.on('hidePopUp', () => {
    Settings.setSettingForKey('isPopUpVisible', false);
  });

  browserWindow.loadURL(webview);
}
