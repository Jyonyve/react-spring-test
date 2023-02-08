import { Box, Button, Card, Grid,  TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import { castToSnapshot } from "mobx-state-tree";
import React from 'react';
import { useStore } from "../store/RootStore";

export const PostingEditFormView = (observer((props:any) => {

  const {showPosting, setShowPosting, close, setRenderWriting, onAddPosting, onSetPostingProps, clubId, boardKind } = props;

  const posting :any = useStore().postingStore.posting;
  const setPostingProps :any= useStore().postingStore.setPostingProps;
  const editPosting :any= useStore().postingStore.editPosting;

  const onClickEvent =async (locationString: string) => {
    if (locationString === `/board/${clubId}/${boardKind}`){
       await onAddPosting(`${clubId}/${boardKind}`);
        setRenderWriting(false);
    } 
    else {
      editPosting();
      close();
      setShowPosting(castToSnapshot(posting));
    }
    
  }

    return(
      window.location.pathname ===  `/board/${clubId}/${boardKind}` ? 

      <form noValidate> 
        <Box>
          <Grid container spacing={2} component={Card} alignContent="center" alignItems="center">
            <Grid item xs={12}>
            <TextField 
              margin="dense"
              id="outlined-basic" 
              label="Title" 
              variant="standard"
              defaultValue={posting && posting.title? posting.title : ""}
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
              defaultValue={posting && posting.contents? posting.contents : ""}
              onChange = { (event) => onSetPostingProps('contents', event.target.value)} 
            />
            </Grid>
            <Grid item xs={4}>
              <Button variant='outlined' color='primary' 
                onClick={ async () => { 
                  await onClickEvent(window.location.pathname)
                }}
              > Add </Button>
            </Grid>
          </Grid>
        </Box>  
      </form>

      :

    <form noValidate> 
    {posting.title && posting.contents && posting.writerEmail && posting.id === '' ? (setPostingProps('title', showPosting.title),
    setPostingProps('contents', showPosting.contents), setPostingProps('writerEmail', showPosting.writerEmail), setPostingProps('id', showPosting.id))
    : void(0)}
      <Box>
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

    );
}));