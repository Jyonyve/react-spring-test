import React, {  useEffect} from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { observer } from 'mobx-react';
import BoardContainer from '../containers/BoardContainer';
import JoinButton from './JoinButton';


const ClubListView = observer((props) => {

  const {onSetClubs, onSetClub, clubs}  = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    onSetClubs()
    // eslint-disable-next-line 
  },[]);

  function clubsFlatter(){
    return clubs.flat(Infinity);
  }

  // const authorization = Object.values(JSON.parse(localStorage.getItem('userRoles')));
    
      
    return (
      <TableContainer component={Paper} >
        <Table m={4}>
          <TableHead >
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Intro</TableCell>
              <TableCell align='center'>Menu</TableCell>
            </TableRow>
          </TableHead>
        <TableBody >
          {clubsFlatter().length && Array.isArray(clubsFlatter()) ? clubsFlatter().map((element) => (
            <TableRow key={element.id} hover onClick={()=> onSetClub(element)}>
              <TableCell align='center'>{element.name}</TableCell>
              <TableCell align='center'>{element.intro}</TableCell>
                <TableCell align='center'>{
                localStorage.getItem('clubRoles').includes(element.id) ?
                <BoardContainer clubName = { element.name} clubId={element.id}/> :
                <JoinButton clubId={element.id}/>
                }</TableCell>
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