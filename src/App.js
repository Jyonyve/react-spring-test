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
          <Route exact path='/' element={<App/>}/>
          <Route path='/login/oauth2/code/google' element = {<OAuthRedirectWait accessToken = {accessToken} setAccessToken = {setAccessToken}/>} />

          {/* <Route exact path='/club' element={
            accessToken !== ''
            ? <ClubRouter accessToken={accessToken}/>
            : <App/>
          }/>
          <Route exact path='/member' element={
            accessToken !== ''
            ? <MemberRouter accessToken = {accessToken}/>
            : <App/>
            }/> */}
        </Routes>
      </div>
  );
}

export default App;
