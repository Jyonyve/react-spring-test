import { NavLink} from "react-router-dom"
import { AppBar, Grid, Box, Typography } from '@material-ui/core';
import { GoogleLoginButtonContainer } from "../containers/GoogleLoginButtonContainer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SimpleCard from "../component/importedViewComponent/SimpleCard";
import { StyledButton } from "../component/importedViewComponent/AppButton";
import { observer } from "mobx-react";


export const LinkSelector = (observer((props:any) => {

    return(
    <Box sx={{ flexGrow: 1 }}>
        <nav className="navtop">
            <AppBar position="static">
                <SimpleCard title={<NavLink to='/'>
                    <Typography variant="h4" color="primary" gutterBottom> Let's travel! club </Typography>
                    </NavLink>} subtitle={
                    <GoogleOAuthProvider
                        clientId="642225847404-je5i44c2t5d6jskll3sk82nqh233ejlk.apps.googleusercontent.com">
                        <GoogleLoginButtonContainer {...props}/>
                    </GoogleOAuthProvider>
                    } icon={undefined}>

                <Grid container alignItems="flex-end" justifyContent="flex-end">        
                    <StyledButton  variant="outlined" color="primary">
                        <NavLink to='/club'>Travel Clubs</NavLink>
                    </StyledButton>
                    <StyledButton variant="outlined" color="secondary">
                        <NavLink to='/member'>Member List</NavLink>
                    </StyledButton>
                </Grid>
                </SimpleCard>
            </AppBar>
        </nav>

        
    </Box>
    )
}))