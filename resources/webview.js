import './app/index.tsx';
import { isDev } from '../src/helpers/environment.ts';

// Disable the context menu to have a more native feel
if (!isDev()) {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}
