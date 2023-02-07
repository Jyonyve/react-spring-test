import { Box, Button, Card, Grid,  TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import React from 'react';

export const PostingEditFormView = (observer((props:any) => {

  const {writeNewPosting, setWriteNewPosting, setRenderWriting, onAddPosting, posting, onSetPostingProps, clubId, boardKind } = props;

  const onClickEvent =async (props:any) => {
    await onAddPosting(`${clubId}/${boardKind}`);
    setRenderWriting(false);
    setWriteNewPosting(writeNewPosting+1);
  }

    return(
      <form noValidate> 
        <Box>
          <Grid container spacing={2} component={Card} alignContent="center" alignItems="center">
            <Grid item xs={12}>
            <TextField 
              margin="dense"
              id="outlined-basic" 
              label="Title" 
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
              margin="dense"
              variant="standard"
              fullWidth
              value={posting && posting.contents? posting.contents : ""}
              onChange = { (event) => onSetPostingProps('contents', event.target.value)} 
            />
            </Grid>
            <Grid item xs={4}>
              <Button variant='outlined' color='primary' 
                onClick={ async () => { 
                  await onClickEvent(props)
                }}
              > Add </Button>
            </Grid>
          </Grid>
        </Box>  
      </form>
    );
}));