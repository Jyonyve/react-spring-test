import {Container, Box} from '@material-ui/core';
// import { MemberEditFormContainer } from '../containers/MemberEditFormContainer';
import SearchbarContainer from '../containers/SearchbarContainer';
import React from 'react';
import { MemberListContainer } from '../containers/MemberListContainer';
import { observer } from 'mobx-react';

const MemberRouter =(observer((props:any) =>{

    return(
        <Container >
          {/* <Box m={3}>
            <MemberEditFormContainer {...props}/>
          </Box> */}
          <Box width="100%" overflow="auto" m={3}>
            <SearchbarContainer />
            <MemberListContainer {...props}/>
          </Box>
      </Container>
    )

}))
export default MemberRouter;