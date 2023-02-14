import React from 'react';
import { Box,  TextField, Grid, IconButton} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { observer } from 'mobx-react';

const ClubEditFormView = (observer((props) =>{

    const {club, onSetClubProps, onAddClub, onUpdateClub, onDeleteClub } = props;


    return(
      <Box container >
      <form noValidate>
        <Grid container spacing={3} justifyContent="center">
        <Grid item >
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Name"
            variant="standard"
            value={club && club.name ? club.name : ""}
            onChange={(event) => onSetClubProps('name', event.target.value)} />
        </Grid>
        <Grid item>
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Intro"
            variant="standard"
            value={club && club.intro ? club.intro : ""}
            onChange={(event) => onSetClubProps('intro', event.target.value)} />
        </Grid>
        <Grid item>
          <IconButton children={<SaveIcon />} onClick={onAddClub}/>
          <IconButton children={<UpdateIcon />} onClick={onUpdateClub}/>
          <IconButton children={<DeleteIcon />} onClick={onDeleteClub}/>
        </Grid>
      </Grid>
    </form>
    </Box>
    )
  
}))

export default ClubEditFormView;