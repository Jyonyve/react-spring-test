import {Container, Box} from '@material-ui/core';
import React from 'react';
import ClubEditFormContainer from '../containers/ClubEditFormContainer';
import ClubListContainer from '../containers/ClubListContainer';
import SearchbarContainer from '../containers/SearchbarContainer';

function ClubRouter (props:any) {

  let id_token = props.id_token;

    return(
        <Container >
          <Box m={3}>
            <ClubEditFormContainer id_token={id_token} />
          </Box>
          <Box m={3}>
            <SearchbarContainer />
            <ClubListContainer id_token={id_token}/>
          </Box>
        </Container>
    )

}
export default ClubRouter;