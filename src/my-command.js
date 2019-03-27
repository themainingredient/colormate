import BrowserWindow from 'sketch-module-web-view';
import { UI } from 'sketch';
import getColors from './get-colors';

const webview = require('../resources/webview.html');

export default function () {
  const options = {
    identifier: 'unique.id',
    width: 640,
    height: 480,
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
  webContents.on('nativeLog', (s) => {
    UI.message(s);
    webContents
      .executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error); // eslint-disable-line no-console
  });


  webContents.on('getColors', (s) => {
    const colors = getColors();
    UI.message(s);
    webContents
      .executeJavaScript(`sendUsedColors(${JSON.stringify(colors)})`)
      .catch(console.error); // eslint-disable-line no-console
  });

  browserWindow.loadURL(webview);
}
