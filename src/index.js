import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClubService from './service/ClubService';
import ClubStore from './store/ClubStore';
import { MemberStore } from './store/MemberStore';
import RootStoreProvider from './store/StoreLCycler'



class RootStore {
  constructor() {
    this.clubStore = ClubStore;
    this.memberStore = MemberStore;
  }
}
const StoreContext = createContext(new RootStore());


ReactDOM.render(
    <RootStoreProvider>
      <App  clubService = {ClubService}/>
    </RootStoreProvider>,
  document.getElementById('root')
);

reportWebVitals();

export const useStores = () => useContext(StoreContext);