import './app';

// TODO: disable the listener for dev env
// Disable the context menu to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
