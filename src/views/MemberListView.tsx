import { observer } from "mobx-react";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import React, { useEffect } from "react";

export const MemberListView = observer((props:any) => {
    
  const {members, onSetMembers, onSetMember, accessToken} = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{onSetMembers()},[]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

    return(
        <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>email</TableCell>
              <TableCell align='center'>Phone</TableCell>
              <TableCell align='center'>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {
          Array.isArray(members) && members.length ?
          members.map( element => (
            <TableRow key={element.id} hover onClick={()=> onSetMember(element)}>
              <TableCell>{element.name}</TableCell>
              <TableCell>{element.email}</TableCell>
              <TableCell>{element.phoneNumber}</TableCell>
              <TableCell>{element.id}</TableCell>
            </TableRow> 
          ))
          :
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
});