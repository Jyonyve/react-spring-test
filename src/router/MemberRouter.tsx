import { Box, Grid} from '@material-ui/core';
// import { MemberEditFormContainer } from '../containers/MemberEditFormContainer';
import SearchbarContainer from '../containers/SearchbarContainer';
import React from 'react';
import { MemberListContainer } from '../containers/MemberListContainer';
import { observer } from 'mobx-react';

const MemberRouter =(observer((props:any) =>{

    return(
          <Box>
            <MemberListContainer {...props}/>
            <Grid container alignItems="flex-end" justifyContent="flex-end">
            <SearchbarContainer />
            </Grid>
          </Box>
    )

}))
export default MemberRouter;