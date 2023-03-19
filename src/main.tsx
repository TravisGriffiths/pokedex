import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { fetchAllPokemon } from './state/slices';
import { store } from './state/store';

store.dispatch(fetchAllPokemon());

// store.dispatch(fetchPosts());
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
          <Provider store={store}>
            <App />
          </Provider>

  </React.StrictMode>,
);
