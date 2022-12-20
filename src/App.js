import { Switch } from '@material-ui/core';
import { Component } from 'react';
import { BrowserRouter, Route, } from 'react-router-dom';
import ClubRouter from './router/ClubRouter';
import { LinkSelector } from './router/LinkSelector';
import MemberRouter from './router/MemberRouter';
import { rootStore, StoreProvider } from './store/RootStore';
import Main from './views/Main';

class App extends Component {
  render(){
    return (
      <StoreProvider value={rootStore}>
        <BrowserRouter>
          <LinkSelector>
            <Switch>
              <Route path='/' component={Main}/>
              <Route path='/club' component={ClubRouter}/>
              <Route path='/member' component={MemberRouter}/>
            </Switch>
          </LinkSelector>
        </BrowserRouter>
      </StoreProvider>    
    );
  }
}

export default App;
