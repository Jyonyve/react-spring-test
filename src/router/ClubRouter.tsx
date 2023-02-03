import {Container, Box} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import ClubEditFormContainer from '../containers/ClubEditFormContainer';
import ClubListContainer from '../containers/ClubListContainer';
import SearchbarContainer from '../containers/SearchbarContainer';

const ClubRouter = (observer((props:any) =>{

  let id_token = props.id_token;

    return(
        <Container >
          <Box width="100%" overflow="auto" m={3}>
            <ClubEditFormContainer id_token={id_token} />
          </Box>
          <Box  width="100%" overflow="auto" m={3}>
            <SearchbarContainer />
            <ClubListContainer id_token={id_token}/>
          </Box>
        </Container>
    )

}))
export default ClubRouter;