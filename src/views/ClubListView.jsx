import React, {  useEffect} from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { observer } from 'mobx-react';
import BoardContainer from '../containers/BoardContainer';


const ClubListView = observer((props) => {

  const {onSetClubs, onSetClub, clubs}  = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    onSetClubs()
  },[]);

  function clubsFlatter(){
    return clubs.flat(Infinity);
  }

  const authorization = Object.values(JSON.parse(localStorage.getItem('userRoles')));
    
      
    return (
      <TableContainer component={Paper} >
        <Table m={3}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Intro</TableCell>
              <TableCell align='center'>Board</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {clubsFlatter().length && Array.isArray(clubsFlatter()) ? clubsFlatter().map((element) => (
            <TableRow key={element.id} hover onClick={()=> onSetClub(element)}>
              <TableCell>{element.name}</TableCell>
              <TableCell>{element.intro}</TableCell>
              <TableCell><BoardContainer clubName = { element.name} clubId={element.id}/></TableCell>
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
  
})
export default ClubListView;