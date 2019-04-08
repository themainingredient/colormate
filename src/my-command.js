import BrowserWindow from 'sketch-module-web-view';
import { UI } from 'sketch';
import { trackAppStart } from './helpers/commands/analytics';
import getColors from './get-colors';
import { TRACKING_ID } from './constants';

const webview = require('../resources/webview.html');

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
    webContents.executeJavaScript(`sendUsedColors(${JSON.stringify(colors)})`).catch(console.error); // eslint-disable-line no-console
  });

  webContents.on('openUrlInBrowser', (url) => {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url)); // eslint-disable-line no-undef
  });

  webContents.on('closeWindow', () => {
    browserWindow.close();
  });

  browserWindow.loadURL(webview);

  trackAppStart(TRACKING_ID);
}
