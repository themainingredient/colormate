import React from 'react';
import ReactDOM from 'react-dom';
import { ListProvider } from './ListContext';
import App from './components/App';


ReactDOM.render(
  <ListProvider>
    <App />
  </ListProvider>,
  document.getElementById('root'),
);
