import { TextField, Grid, Button} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { observer } from "mobx-react";
import React from 'react';

export const MemberEditformView = (observer((props:any) => {

  const {member, onAddMember, onUpdateMember, onDeleteMember, onSetMemberProps} = props;
    return(
      <form noValidate> 
        <Grid container xs={12} spacing={3}>
          <Grid item xs={3}>
            <TextField 
              margin="normal"
              id="outlined-basic" 
              label="Name" 
              variant="standard"
              value={member && member.name ? member.name : ""}
              onChange = { (event) => onSetMemberProps('name', event.target.value)} 
              />
          </Grid>
          <Grid item xs={3}>
            <TextField 
              margin="normal"
              id="outlined-basic" 
              label="email" 
              variant="standard"
              value={member && member.email ? member.email : ""}
              onChange = { (event) => onSetMemberProps('email', event.target.value)} 
            />
          </Grid>
          <Grid item xs={3}>
            <TextField 
              margin="normal"
              id="outlined-basic" 
              label="PhoneNumber" 
              variant="standard"
              value={member && member.phoneNumber ? member.phoneNumber : ""}
              onChange = { (event) => onSetMemberProps('phoneNumber', event.target.value)} 
            />
          </Grid>
        </Grid>
        <Grid item>
         <Button variant='contained' color='primary' startIcon={<SaveIcon />}
                onClick={onAddMember} > Add </Button>&nbsp;&nbsp;
         <Button variant='contained' color='default' startIcon={<UpdateIcon />}
                onClick={onUpdateMember} > Update </Button>&nbsp;&nbsp;
         <Button variant='contained' color='secondary' startIcon={<DeleteIcon />}
                onClick={onDeleteMember}> Delete </Button>&nbsp;&nbsp;
          
        </Grid>
      </form>
    );
}));