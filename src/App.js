import { Route,  Routes } from 'react-router-dom';
import ClubRouter from './router/ClubRouter';
import MemberRouter from './router/MemberRouter';
import { LinkSelector } from './router/LinkSelector';
// import OAuthRedirectWait from './views/OAuthRedirectWait';
import OAuthRedirectSuccess from './views/OAuthRedirectSuccess';

const App = (props) => {
    
    return (
      <div className='App'>
        <LinkSelector/>
        <Routes>
          <Route exact path='/app' element={<App/>}/>
          <Route exact path='/club' element={<ClubRouter/>}/>
          <Route exact path='/member' element={<MemberRouter/>} />
          {/* <Route path='http://localhost:8080/login/oauth2/code/*' element = {<OAuthRedirectWait/>} /> */}
          <Route exact path='/login/oauth2/success' element={<OAuthRedirectSuccess/>} />
        </Routes>
      </div>
  );
}

export default App;
