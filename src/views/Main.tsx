import MainService from "../service/MainService"
import { Table, TableContainer, TableRow, TableCell, Paper, TableBody } from '@material-ui/core';
import React , {useState, useEffect} from 'react';

export const Main = () => {

    let [message, setMessage] = useState("")

    let rawM :string = '';
    
    Promise.resolve(MainService.getHelloWorld()).then(res =>  rawM = res)
    console.log(rawM);
    
    useEffect ( () => {setMessage(rawM)} , [rawM]);


    return (
    <TableContainer component={Paper} >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align='center'> Welcome, {message ? message: `This Comment is` } from React!</TableCell>
            </TableRow>
          </TableBody>
        </Table>
     </TableContainer>        
    )
}