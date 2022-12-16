import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClubService from './service/ClubService';


ReactDOM.render(
    <React.StrictMode>
      <App  clubService = {ClubService}/>
    </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
