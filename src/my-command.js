import BrowserWindow from 'sketch-module-web-view';

import { UI } from 'sketch';

const webview = require('../resources/webview.html');

export default function () {
  const options = {
    identifier: 'unique.id',
    width: 240,
    height: 180,
    show: true,
    resizable: false,
  };

  const browserWindow = new BrowserWindow(options);

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
  });

  const { webContents } = browserWindow;

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('UI loaded!');
  });

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', (s) => {
    UI.message(s);
    webContents
      .executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error); // eslint-disable-line no-console
  });

  browserWindow.loadURL(webview);
}
