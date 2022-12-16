import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClubService from './service/ClubService';
import RootStoreProvider from './store/StoreLCycler'

ReactDOM.render(
    <RootStoreProvider>
      <App  clubService = {ClubService}/>
    </RootStoreProvider>,
  document.getElementById('root')
);

reportWebVitals();
