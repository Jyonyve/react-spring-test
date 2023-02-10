import { Box, Button, Card, Grid,  TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import { castToSnapshot } from "mobx-state-tree";
import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useStore } from "../store/RootStore";

export const PostingEditFormView = (observer((props:any) => {

  const { setShowPosting, close} = props;

  const posting :any = useStore().postingStore.posting;
  const setPostingProps :any= useStore().postingStore.setPostingProps;
  const editPosting :any= useStore().postingStore.editPosting;

  const location = useLocation();
  const {postingId ,title ,contents ,writerEmail ,readCount,boardId} = location.state;

  const onClickEvent =async (locationString: string) => {
      editPosting();
      close();
      setShowPosting(castToSnapshot(posting));
  }

  useEffect(() => {
    setPostingProps('title', title)
    setPostingProps('contents', contents)
    setPostingProps('writerEmail', writerEmail)
    setPostingProps('id', postingId)
    setPostingProps('readCount', Number(readCount))
    setPostingProps('boardId', boardId)
    // eslint-disable-next-line
  },[])


    return(

    <form noValidate> 
      <Box>
      {console.log(`postingEditFormView`)}
        <Grid container spacing={2} component={Card} alignContent="center" alignItems="center">
          <Grid item xs={12}>
          <TextField 
            margin="dense"
            id="outlined-basic" 
            label="Title" 
            variant="standard"
            defaultValue={posting && posting.title? posting.title : ""}
            onChange = { (event) => setPostingProps('title', event.target.value)} 
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
            defaultValue={posting && posting.contents? posting.contents : ""}
            onChange = { (event) => setPostingProps('contents', event.target.value)} 
          />
          </Grid>
          <Grid item xs={4}>
            <Button variant='outlined' color='primary' 
              onClick={ async () => { 
                await onClickEvent(window.location.pathname)
              }}
            > Post </Button>
          </Grid>
        </Grid>
      </Box>  
    </form>
    )
}));