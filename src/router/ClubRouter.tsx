import { Grid} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import ClubEditFormContainer from '../containers/ClubEditFormContainer';
import ClubListContainer from '../containers/ClubListContainer';
import SearchbarContainer from '../containers/SearchbarContainer';

const ClubRouter = (observer((props:any) =>{

  let id_token = props.id_token;

    return(
        // <Container >
          <Grid >
            <Grid container alignItems="center" justifyContent="center"></Grid>
            <ClubEditFormContainer id_token={id_token} />
            <ClubListContainer id_token={id_token}/>
            <Grid container alignItems="flex-end" justifyContent="flex-end">
              <SearchbarContainer />
            </Grid>
          </Grid>
        // </Container>
    )

}))
export default ClubRouter;