import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { rootStore, StoreProvider } from './store/RootStore';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import axios from 'axios';

axios.defaults.withCredentials = true;

ReactDOM.render(
  
    <Provider rootStore ={rootStore} >
      <StoreProvider value={rootStore}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </StoreProvider>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
