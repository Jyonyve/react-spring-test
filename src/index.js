import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { rootStore } from './store/RootStore';

ReactDOM.render(
    <Provider rootStore = {rootStore}>
    <App/>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
