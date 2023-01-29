import { NavLink} from "react-router-dom"
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { GoogleLoginContainer } from "../containers/GoogleLoginContainer";
import { GoogleOAuthProvider } from "@react-oauth/google";


export const LinkSelector = (props:any) => {

    const accessToken = props.accessToken;

    return(
        <><nav className="navtop">
            <h2><NavLink to='/'> Let's travel! club </NavLink></h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead></TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <ul className="nav-links">
                                    <li><NavLink to='/app'>App Main</NavLink></li>
                                    <li 
                                        {...accessToken
                                        ? <NavLink to='/club'>Travel Clubs</NavLink>
                                        : ''}
                                    ></li>
                                    <li
                                        {...accessToken
                                        ? <NavLink to='/member'>For Members</NavLink>
                                        : ''}
                                    ></li>
                                </ul>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </nav>
        <GoogleOAuthProvider
            clientId="642225847404-je5i44c2t5d6jskll3sk82nqh233ejlk.apps.googleusercontent.com">
        <GoogleLoginContainer />
        </GoogleOAuthProvider>
        </>
    )
}