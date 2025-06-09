import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store';     // Import your store
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your App with Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
);