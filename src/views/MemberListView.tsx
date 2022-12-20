import { observer } from "mobx-react";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import React from "react";

export const MemberListView = (observer((props:any) => {
    
    return(
        <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Intro</TableCell>
              <TableCell align='center'>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {
        //   <TableRow key={element.id} hover onClick={()=> onSelectedClub(element)}>
        //     <TableCell>{element.name}</TableCell>
        //     <TableCell>{element.intro}</TableCell>
        //     <TableCell>{element.id}</TableCell>
        //   </TableRow> 
           <TableRow>
             <TableCell>empty</TableCell>
             <TableCell>empty</TableCell>
             <TableCell>empty</TableCell>
           </TableRow>

        }
          </TableBody>            
        </Table>
      </TableContainer>
    )
}));