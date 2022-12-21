import React, { Component } from 'react';
import ClubEditFormContainer from './containers/ClubEditFormContainer';
import ClubListContainer from './containers/ClubListContainer';

import {Box, Container} from '@material-ui/core';

class App extends Component {
  render(){
    return (
      <Container >
        <Box m={3}>
          <ClubEditFormContainer />
        </Box>
        <Box m={3}>
          <ClubListContainer/>
        </Box>
      </Container>
  );
  }
}

export default App;
