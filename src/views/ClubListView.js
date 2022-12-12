import React, { PureComponent } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { observer } from 'mobx-react';


@observer
class ClubListView extends PureComponent {
  render(){

    const {clubs, onSelectedClub} = this.props;


    return (
      <TableContainer component={Paper} >
        <Table m={3}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Intro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            Array.isArray(clubs) && clubs.length ? 
            clubs.map( (club ) => (
              <TableRow key={club.reactId} hover onClick={()=> onSelectedClub(club)}>
                <TableCell>{club.name}</TableCell>
                <TableCell>{club.intro}</TableCell>
              </TableRow>
            ))
            : 
            <TableRow>
              <TableCell> empty </TableCell>
            </TableRow>
            }
            
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default ClubListView;