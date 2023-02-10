import { Box, Button, Card, Grid,  TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import { useStore } from "../store/RootStore";

export const PostingInsertFormView = (observer((props:any) => {

  const {setRenderWriting, onAddPosting, onSetPostingProps, clubId, boardKind } = props;

  const posting :any = useStore().postingStore.posting;
  const setPostingProps :any= useStore().postingStore.setPostingProps;

  const onClickEvent =async (locationString: string) => {
        setPostingProps('boardId', `${clubId}/${boardKind}`);
       await onAddPosting(`${clubId}/${boardKind}`);
        setRenderWriting(false);
  }

  
    return(
      //insert case (not edit)
      <form noValidate> 
        <Box>
          {console.log(`postingInsertFormView`)}
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
    )
     
}));