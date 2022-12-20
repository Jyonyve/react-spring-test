import {Container, Box} from '@material-ui/core';
import { MemberEditFormContainer } from '../containers/MemberEditFormContainer';
import SearchbarContainer from '../containers/SearchbarContainer';

function MemberRouter (props:any) {

    return(
        <Container >
          <Box m={3}>
            <MemberEditFormContainer />
          </Box>
          <Box m={3}>
            <SearchbarContainer />
            {/* <MemberListView/> */}
          </Box>
      </Container>
    )

}
export default MemberRouter;