import React, { Component } from 'react';
import ClubEditFormContainer from './containers/ClubEditFormContainer';
import ClubListContainer from './containers/ClubListContainer';

import {Box, Container} from '@material-ui/core';
import SearchbarContainer from './containers/SearchbarContainer';

class App extends Component {
  render(){
    return (
      <Container >
        <Box m={3}>
          <ClubEditFormContainer />
        </Box>
        <Box m={3}>
          <SearchbarContainer />
          <ClubListContainer />
        </Box>
      </Container>
  );
  }
}

export default App;
