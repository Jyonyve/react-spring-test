import { Route,  Routes } from 'react-router-dom';
import ClubRouter from './router/ClubRouter';
import { LinkSelector } from './router/LinkSelector';
import MemberRouter from './router/MemberRouter';
import { Login } from './views/LoginView';
 

const App = () => {
    
    return (
      <div className='App'>
        <LinkSelector/>
        <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/club' element={<ClubRouter/>}/>
          <Route exact path='/member' element={<MemberRouter/>} />
        </Routes>
      </div>
  );
}

export default App;
