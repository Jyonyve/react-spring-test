import { NavLink} from "react-router-dom"
import { Table, TableContainer, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { GoogleLoginButtonContainer } from "../containers/GoogleLoginButtonContainer";
import { GoogleOAuthProvider } from "@react-oauth/google";


export const LinkSelector = (props:any) => {

    return(
        <><nav className="navtop">
            <h2><NavLink to='*'> Let's travel! club </NavLink></h2>
        <GoogleOAuthProvider
            clientId="642225847404-je5i44c2t5d6jskll3sk82nqh233ejlk.apps.googleusercontent.com">
            <GoogleLoginButtonContainer {...props}/>
        </GoogleOAuthProvider>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow className="nav-links">
                            <TableCell><NavLink to='/'>App Main</NavLink></TableCell>
                            <TableCell> <NavLink to='/club'>Travel Clubs</NavLink></TableCell>
                            <TableCell><NavLink to='/member'>For Members</NavLink></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </nav>
        </>
    )
}