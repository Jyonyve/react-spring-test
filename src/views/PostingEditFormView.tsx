import { Box, Button, Card, Grid,  TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import React from 'react';

export const PostingEditFormView = (observer((props:any) => {

  const { setRenderWriting, onAddPosting, posting, onSetPostingProps, clubId, boardKind, setWriteNewPosting, writeNewPosting} = props;

    return(
      <form noValidate> 
        <Box>
          <Grid container spacing={3} component={Card} alignContent="center" alignItems="center">
            <Grid item xs={12}>
            <TextField 
              margin="normal"
              id="outlined-basic" 
              label="title" 
              variant="standard"
              value={posting && posting.title? posting.title : ""}
              onChange = { (event) => onSetPostingProps('title', event.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Contents"
              multiline
              fullWidth
              value={posting && posting.contents? posting.contents : ""}
              onChange = { (event) => onSetPostingProps('contents', event.target.value)} 
            />
            </Grid>
            <Grid item xs={4}>
              <Button variant='outlined' color='primary' 
                onClick={ async () => { 
                  await onAddPosting(`${clubId}/${boardKind}`);
                  setRenderWriting(false);
                  setWriteNewPosting(writeNewPosting+1);}
                }
              > Add </Button>
            </Grid>
            <Grid item xs={4} >
              <Button variant='outlined' color='default' 
                // onClick={onUpdateMember} 
                > Update  </Button>
            </Grid>
            <Grid item xs={4} >
              <Button variant='outlined' color='secondary' 
                // onClick={onDeleteMember}
                > Delete </Button>
            </Grid>
          </Grid>
        </Box>  
      </form>
    );
}));