import { Component } from 'react';
import {  Route, Routes } from 'react-router-dom';
import ClubRouter from './router/ClubRouter';
import { LinkSelector } from './router/LinkSelector';
import MemberRouter from './router/MemberRouter';
import Main from './views/Main';
import React from 'react'

class App extends Component {
  render(){
    return (
      <div className="App">
        <LinkSelector/>
          <Routes>
            <Route exact path='/' component={Main}/>
            <Route path='/club' component={ClubRouter}/>
            <Route path='/member' component={MemberRouter}/>
            <Route component={ () => <h2>Page not found...</h2>}/>
          </Routes>
      </div>
    );
  }
}

export default App;
