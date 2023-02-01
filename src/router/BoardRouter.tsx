import { Box, Container } from "@material-ui/core";
import BoardContainer from "../containers/BoardContainer";

function BoardRouter (props:any){
    return(
        <Container>
            <Box width="100%" overflow="auto" m={3}>
                <BoardContainer {...props}/>
            </Box>
      </Container>
    )
}
export default BoardRouter