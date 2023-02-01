import React, { PureComponent} from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import autobind from 'autobind-decorator';
import BoardContainer from '../containers/BoardContainer';

@observer
@autobind
class ClubListView extends PureComponent {

  constructor(props){
    super(props);
    this.props.onSetClubs();
  }

  @action
  clubsFlatter(){
    const clubs = this.props.clubs;
    return clubs.flat(Infinity);
  }

  authorization = Object.values(JSON.parse(localStorage.getItem('userRoles')));
  
  render(){
    
    let onSetClub = this.props.onSetClub;
    const clubsFlat = this.clubsFlatter();  
      
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
          {clubsFlat.length && Array.isArray(clubsFlat) ? clubsFlat.map((element) => (
            <TableRow key={element.id} hover onClick={()=> onSetClub(element)}>
              <TableCell>{element.name}</TableCell>
              <TableCell>{element.intro}</TableCell>
              <TableCell><BoardContainer clubId={element.id}/></TableCell>
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