import React from 'react';
import { Route,  Routes } from 'react-router-dom';
import ClubRouter from './router/ClubRouter';
import { LinkSelector } from './router/LinkSelector';
import { Main } from './views/Main';

const App = () => {
    return (
      <div className='App'>
        <LinkSelector/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/club' element={<ClubRouter/>}/>
          {/* <Route path='/member' component={MemberRouter}/> */}
        </Routes>
      </div>
  );
}

export default App;
