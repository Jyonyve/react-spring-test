import { Box, Container, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import { StyledButton } from "../component/importedViewComponent/AppButton";

const JoinButton = observer((props:any) =>{

    const {clubId} = props;

    return(
        <Popup trigger={<StyledButton size="small" variant="outlined" color="primary"> Join</StyledButton>} position="top center" modal >
            {((close: any) => (
                <Box className="modal">
                    <Container >
                        <Typography align="center" color="textPrimary"> Are you joining us? </Typography>
                        <Box textAlign="center">
                            <NavLink to={`/membership/${clubId}`}>
                            <StyledButton size="small" variant="contained" color="success"> Yes:3 </StyledButton>
                            </NavLink>
                            <StyledButton size="small" variant="contained" color="inherit" onClick={() => 
                                {
                                close();
                                }
                            }> No Tnx! </StyledButton>
                        </Box>
                    </Container>
                </Box>
            )) as unknown as ReactNode}
        </Popup>
    );
})
export default JoinButton;