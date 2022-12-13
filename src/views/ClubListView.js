import React, { PureComponent} from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { observer } from 'mobx-react';

@observer
class ClubListView extends PureComponent {

  render(){

    let {onSelectedClub, clubs} = this.props;
    let p_clubs = [];

    Promise.resolve(clubs).then(value => p_clubs = value);

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
              p_clubs.map( club => 
                
              <TableRow key={club.reactId} hover onClick={()=> onSelectedClub(club)}>
                <TableCell>{club.name}</TableCell>
                <TableCell>{club.intro}</TableCell>
                <TableCell>{club.id}</TableCell>
              </TableRow> 
                             
              ).forEach(club => console.log(club))
              
            } 
          </TableBody>            
        </Table>
      </TableContainer>
    )
  }
}

export default ClubListView;