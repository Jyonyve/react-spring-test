import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { rootStore, StoreProvider } from './store/RootStore';

ReactDOM.render(
  <StoreProvider value={rootStore}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StoreProvider>,    
  document.getElementById('root')
);

reportWebVitals();
