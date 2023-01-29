import {Container, Box} from '@material-ui/core';
import React from 'react';
import ClubEditFormContainer from '../containers/ClubEditFormContainer';
import ClubListContainer from '../containers/ClubListContainer';
import SearchbarContainer from '../containers/SearchbarContainer';

function ClubRouter (props:any) {

  let accessToken = props.accessToken;

    return(
        <Container >
          <Box m={3}>
            <ClubEditFormContainer accessToken={accessToken} />
          </Box>
          <Box m={3}>
            <SearchbarContainer />
            <ClubListContainer accessToken={accessToken}/>
          </Box>
        </Container>
    )

}
export default ClubRouter;