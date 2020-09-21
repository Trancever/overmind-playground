import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import App from './App';
import config from './overmind/renewal';

const overmind = createOvermind(config);

ReactDOM.render(
  <React.StrictMode>
    <Provider value={overmind}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
