import 'date-fns';
import React, { PureComponent } from 'react';
import { TextField, Grid, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { observer } from 'mobx-react';

@observer
class ClubEditFormView extends PureComponent {
  render(){


    const {club, onSetClubProps, onAddClub, onUpdateClub, onDeleteClub } = this.props;


    return(
      <form noValidate>
        <Grid container xs={12} spacing={3}>
          <Grid item xs={3}>
            <TextField 
              margin="normal"
              id="outlined-basic" 
              label="Name" 
              variant="standard"
              value={club && club.name ? club.name : ""}
              onChange = { (event) => onSetClubProps('name', event.target.value)} 
              />
          </Grid>
          <Grid item xs={3}>
            <TextField 
              margin="normal"
              id="outlined-basic" 
              label="Intro" 
              variant="standard"
              value={club && club.intro ? club.intro : ""}
              onChange = { (event) => onSetClubProps('intro', event.target.value)} 
            />
          </Grid>
        </Grid>
        <Grid item>
         <Button variant='contained' color='primary' startIcon={<SaveIcon />}
                onClick={onAddClub} > Add </Button>&nbsp;&nbsp;
         <Button variant='contained' color='default' startIcon={<UpdateIcon />}
                onClick={onUpdateClub} > Update </Button>&nbsp;&nbsp;
         <Button variant='contained' color='secondary' startIcon={<DeleteIcon />}
                onClick={onDeleteClub}> Delete </Button>&nbsp;&nbsp;
          
        </Grid>
      </form>
    )
  }
}

export default ClubEditFormView;