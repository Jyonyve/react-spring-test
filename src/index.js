import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { rootStore, StoreProvider } from './store/RootStore';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'mobx-react';
import {GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLoginContainer } from './containers/GoogleLoginContainer';

ReactDOM.render(
  <GoogleOAuthProvider clientId="642225847404-je5i44c2t5d6jskll3sk82nqh233ejlk.apps.googleusercontent.com">
    <Provider rootStore ={rootStore} >
    <StoreProvider value={rootStore}>
      <BrowserRouter>
        <GoogleLoginContainer/>
      </BrowserRouter>
     </StoreProvider>
    </Provider>
    </GoogleOAuthProvider>,
  document.getElementById('root')
);

reportWebVitals();
