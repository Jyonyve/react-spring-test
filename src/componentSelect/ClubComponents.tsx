import {Box, Container} from '@material-ui/core';
import ClubEditFormContainer from '../containers/clubContainers/ClubEditFormContainer'
import SearchbarContainer from '../containers/clubContainers/SearchbarContainer';
import ClubListContainer from '../containers/clubContainers/ClubListContainer';

export const ClubComponents = () => {

    return(
        <Container >
        <Box m={3}>
          <ClubEditFormContainer />
        </Box>
        <Box m={3}>
          <SearchbarContainer />
          <ClubListContainer/>
        </Box>
      </Container>
    )

}