import './app';

// Disable the context menu to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// called from the plugin
window.setRandomNumber = (randomNumber) => {
  document.getElementById('answer').innerHTML = `Random number from the plugin: ${randomNumber}`;
};
