import {Container, Box} from '@material-ui/core';
import { MemberEditFormContainer } from '../containers/MemberEditFormContainer';
import SearchbarContainer from '../containers/SearchbarContainer';
import React from 'react';
import { MemberListContainer } from '../containers/MemberListContainer';

function MemberRouter () {

    return(
        <Container >
          <Box m={3}>
            <MemberEditFormContainer />
          </Box>
          <Box m={3}>
            <SearchbarContainer />
            <MemberListContainer />
          </Box>
      </Container>
    )

}
export default MemberRouter;