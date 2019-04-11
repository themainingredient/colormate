import './app';
import { isDev } from '../src/helpers/environment';

// Disable the context menu to have a more native feel
if (!isDev()) {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}
