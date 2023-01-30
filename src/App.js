import { Route,  Routes } from 'react-router-dom';
import ClubRouter from './router/ClubRouter';
import MemberRouter from './router/MemberRouter';
import { LinkSelector } from './router/LinkSelector';
import GoogleLoginTokenAndView from './views/GoogleLoginTokenAndView';
import { useState } from 'react';

const App = () => {
    
    const [id_token, setId_token] = useState('');

    return (
      <div className='App'>       
      <LinkSelector id_token = {id_token} setId_token = {setId_token}/> 
        <Routes>
          <Route path='/login/oauth2/code/google' element = {<GoogleLoginTokenAndView id_token = {id_token} setId_token = {setId_token}/>} />
          
          <Route exact path='/club' element={
            id_token !== ''
            ? <ClubRouter id_token={id_token}/>
            : `this service is only for members. please login`
          }/>
          <Route exact path='/member' element={
            id_token !== ''
            ? <MemberRouter id_token = {id_token}/>
            : `this service is only for members. please login`
            }/>
        </Routes>
      </div>
  );
}

export default App;
