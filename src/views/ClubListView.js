import React, { PureComponent} from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';


class ClubListView extends PureComponent {

  render(){

    let onSelectedClub = this.props.onSelectedClub;
    const clubs = this.props.clubs;
    let clubsFlat = clubs.flat(Infinity);

    return (
      <TableContainer component={Paper} >
        <Table m={3}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Intro</TableCell>
              <TableCell align='center'>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {
        clubsFlat.length && Array.isArray(clubsFlat) ?
        clubsFlat.map((element) => (
          <TableRow key={element.reactId} hover onClick={()=> onSelectedClub(element)}>
            <TableCell>{element.name}</TableCell>
            <TableCell>{element.intro}</TableCell>
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
  }
}

export default ClubListView;