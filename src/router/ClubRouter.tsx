import { Grid} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import ClubEditFormContainer from '../containers/ClubEditFormContainer';
import ClubListContainer from '../containers/ClubListContainer';
import SearchbarContainer from '../containers/SearchbarContainer';

const ClubRouter = (observer((props:any) =>{

  const {id_token, adminChecker} = props;

    return(
        // <Container >
          <Grid >
            <Grid container alignItems="center" justifyContent="center"></Grid>
            { adminChecker ? 
            <ClubEditFormContainer id_token={id_token} />
            : null}
            <ClubListContainer id_token={id_token}/>
            <Grid container alignItems="flex-end" justifyContent="flex-end">
              <SearchbarContainer />
            </Grid>
          </Grid>
        // </Container>
    )

}))
export default ClubRouter;