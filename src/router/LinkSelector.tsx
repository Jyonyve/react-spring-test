import { NavLink} from "react-router-dom"
import { AppBar, Toolbar, Box } from '@material-ui/core';
import { GoogleLoginButtonContainer } from "../containers/GoogleLoginButtonContainer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SimpleCard from "../component/importedViewComponent/SimpleCard";
import {StyledButton} from "../component/importedViewComponent/AppButton";


export const LinkSelector = (props:any) => {

    return(
    <Box sx={{ flexGrow: 1 }}>
        <nav className="navtop">
            <AppBar position="static">
                <SimpleCard title={<NavLink to='/'>Let's travel! club</NavLink>} subtitle={undefined} icon={undefined}>
                    <StyledButton  variant="contained" color="info">
                        <NavLink to='/club'>Travel Clubs</NavLink>
                    </StyledButton>
                    <StyledButton variant="contained" color="info">
                        <NavLink to='/member'>For Members</NavLink>
                    </StyledButton>
                </SimpleCard>
            </AppBar>
        </nav>

        <GoogleOAuthProvider
            clientId="642225847404-je5i44c2t5d6jskll3sk82nqh233ejlk.apps.googleusercontent.com">
            <GoogleLoginButtonContainer {...props}/>
        </GoogleOAuthProvider>
    </Box>
    )
}