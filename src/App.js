import React from 'react';
import { Route,  Routes } from 'react-router-dom';
import ClubRouter from './router/ClubRouter';
import { LinkSelector } from './router/LinkSelector';
import MemberRouter from './router/MemberRouter';
import { Main } from './views/Main';

const App = () => {
    return (
      <div className='App'>
        <LinkSelector/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/club' element={<ClubRouter/>}/>
          <Route path='/member' element={<MemberRouter/>} />
        </Routes>
      </div>
  );
}

export default App;
