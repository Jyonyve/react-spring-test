import {Container, Box} from '@material-ui/core';
import { MemberEditFormContainer } from '../containers/MemberEditFormContainer';
import SearchbarContainer from '../containers/SearchbarContainer';
import React from 'react';

function MemberRouter (props:any) {

    return(
        <Container >
          <Box m={3}>
            <MemberEditFormContainer />
          </Box>
          <Box m={3}>
            <SearchbarContainer />
          </Box>
      </Container>
    )

}
export default MemberRouter;