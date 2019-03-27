import './app';

// Disable the context menu to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.getElementById('button-rndm').addEventListener('click', () => {
  window.postMessage('nativeLog', 'Called from the webview');
});

document.getElementById('button-clrs').addEventListener('click', () => {
  window.postMessage('getColors', 'foobar');
});

// called from the plugin
window.setRandomNumber = (randomNumber) => {
  document.getElementById('answer').innerHTML = `Random number from the plugin: ${randomNumber}`;
};
