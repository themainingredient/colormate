import { ListProvider } from './ListContext';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';


ReactDOM.render(
  <ListProvider>
    <App />
  </ListProvider>,
  document.getElementById('root'),
);
