import { Route,  Routes } from 'react-router-dom';
import ClubRouter from './router/ClubRouter';
import MemberRouter from './router/MemberRouter';
import { LinkSelector } from './router/LinkSelector';
import OAuthRedirectWait from './views/OAuthRedirectWait';
import { useState } from 'react';

const App = () => {
    
    const [accessToken, setAccessToken] = useState('');

    return (
      <div className='App'>
        <LinkSelector accessToken = {accessToken}/> 
        
        <Routes>
          <Route path='/login/oauth2/code/google' element = {<OAuthRedirectWait accessToken = {accessToken} setAccessToken = {setAccessToken}/>} />
          
          <Route exact path='/club' element={
            accessToken !== ''
            ? <ClubRouter accessToken={accessToken}/>
            : `this service is only for members. please login`
          }/>
          <Route exact path='/member' element={
            accessToken !== ''
            ? <MemberRouter accessToken = {accessToken}/>
            : `this service is only for members. please login`
            }/>
        </Routes>
      </div>
  );
}

export default App;
