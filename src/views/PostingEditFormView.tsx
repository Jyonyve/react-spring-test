import { Box, Button, Card, Grid,  TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import React from 'react';
import { useStore } from "../store/RootStore";

export const PostingEditFormView = (observer((props:any) => {

  const {showPosting, setRenderWriting, onAddPosting, onSetPostingProps, clubId, boardKind } = props;

  const posting = useStore().postingStore.posting;
  const setPostingProps = useStore().postingStore.setPostingProps;
  const editPosting = useStore().postingStore.editPosting;

  const onClickEvent =async (locationString: string) => {
    console.log(locationString)
    if (locationString === `/board/${clubId}/${boardKind}`){
       await onAddPosting(`${clubId}/${boardKind}`);
        setRenderWriting(false);
    } 
    else {
      editPosting();
    }
    window.close()
  }

    return(
      window.location.pathname ===  `/board/${clubId}/${boardKind}` ? 

      <form noValidate> 
      {console.log(`insert new posting, path : ${window.location.pathname}`)}
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
    {console.log(`edit posting, path : ${window.location.pathname}`)}
    {setPostingProps('title', showPosting.title)}
    {setPostingProps('contents', showPosting.contents)}
    {setPostingProps('writerEmail', showPosting.writerEmail)}
    {setPostingProps('id', showPosting.id)}
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