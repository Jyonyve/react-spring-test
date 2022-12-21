import React, { PureComponent} from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { observer } from 'mobx-react';
//import { action } from 'mobx';
import autobind from 'autobind-decorator';

@observer
@autobind
class ClubListView extends PureComponent {

  // @action
  // clubsFlatter(){
  //   const clubs = this.props.clubs;
  //   return clubs.flat(Infinity);
  // }

  render(){
   
    //const clubsFlat = this.clubsFlatter();    
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
        this.props.clubs.length && Array.isArray(this.props.clubs) ?
        
        this.props.clubs.map((element) => (
          <TableRow key={element.id} hover onClick={()=> this.props.onSetClub(element)}>
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