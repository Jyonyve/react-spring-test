import { Switch } from '@material-ui/core';
import { Component } from 'react';
import { Route } from 'react-router-dom';
import ClubRouter from './router/ClubRouter';
import { LinkSelector } from './router/LinkSelector';
import MemberRouter from './router/MemberRouter';
import { rootStore, StoreProvider } from './store/RootStore';

class App extends Component {
  render(){
    return (
      <StoreProvider value={rootStore}>
        <LinkSelector>
          <Switch>
            <Route path='/club' component={ClubRouter}/>
            <Route path='/member' component={MemberRouter}/>
          </Switch>
        </LinkSelector>
      </StoreProvider>    
    );
  }
}

export default App;
