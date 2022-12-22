import {Container, Box} from '@material-ui/core';
import { MemberEditFormContainer } from '../containers/MemberEditFormContainer';
import SearchbarContainer from '../containers/SearchbarContainer';
import React from 'react';
import { MemberListView } from '../views/MemberListView';

function MemberRouter () {

    return(
        <Container >
          <Box m={3}>
            <MemberEditFormContainer />
          </Box>
          <Box m={3}>
            <SearchbarContainer />
            <MemberListView />
          </Box>
      </Container>
    )

}
export default MemberRouter;