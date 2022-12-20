import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'mobx-react'
import ClubStore from './store/ClubStore'
import ClubService from './service/ClubService';
import { MemberStore } from './store/MemberStore';

ReactDOM.render(
    <Provider 
    clubStore = {ClubStore}
    memberStore = {MemberStore}>
      <App  clubService = {ClubService}/>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
