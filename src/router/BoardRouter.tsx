import { Box, Container } from "@material-ui/core";
import { observer } from "mobx-react";
import BoardContainer from "../containers/BoardContainer";

const BoardRouter = (observer((props:any) =>{
    return(
        <Container>
            <Box width="100%" overflow="auto" m={3}>
                <BoardContainer {...props}/>
            </Box>
      </Container>
    )
}))
export default BoardRouter