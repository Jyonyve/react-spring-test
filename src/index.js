import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { rootStore, StoreProvider } from './store/RootStore';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import axios from 'axios';

axios.defaults.withCredentials = true;

ReactDOM.render(
  
      <StoreProvider value={rootStore}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </StoreProvider>,
    
  document.getElementById('root')
);

reportWebVitals();
