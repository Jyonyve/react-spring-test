import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { rootStore, StoreProvider } from './store/RootStore';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'mobx-react';


ReactDOM.render(
    <Provider rootStore ={rootStore} >
    <StoreProvider value={rootStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
     </StoreProvider>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
