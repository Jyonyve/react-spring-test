import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { rootStore } from './store/RootStore';
import {BrowserRouter} from 'react-router-dom';


ReactDOM.render(
    <Provider rootStore = {rootStore}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
