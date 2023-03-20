import { Box, Button, Card, Grid,  TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { TestBoardChecker } from "../component/Rolechecker";
import { useStore } from "../store/RootStore";

export const PostingInsertFormView = (observer((props:any) => {

  const {setRenderWriting, onAddPosting, onSetPostingProps, clubId, boardKind, onAddSamplePosting } = props;

  const navigate  = useNavigate();
  const posting :any = useStore().postingStore.posting;
  const setPostingProps :any= useStore().postingStore.setPostingProps;

  let postingId = '';

  const onClickEvent = async (locationString: string) => {
  setPostingProps('boardId', `${clubId}/${boardKind}`);
  await onAddPosting(`${clubId}/${boardKind}`);
  setRenderWriting(false);
  };

  const navigateToPosting = (postingId: string) => {
    TestBoardChecker() ? navigate(`/test/${postingId}`, {
      state: {
        postingId: `${postingId}`,
        title: `${posting.title}`,
        contents: `${posting.contents}`,
        readCount: `${posting.readCount}`,
        writtenDate: `${posting.writtenDate}`,
        boardId: `${clubId}/${boardKind}`,
        pathlocation: window.location.pathname,
      },
    }) 
    
    : navigate(`/board/posting/${postingId}`,{
      state: {
        postingId: `${postingId}`,
        writerEmail: `${posting.writerEmail}`,
        title: `${posting.title}`,
        contents: `${posting.contents}`,
        readCount: `${posting.readCount}`,
        writtenDate: `${posting.writtenDate}`,
        boardId: `${clubId}/${boardKind}`,
        pathlocation: window.location.pathname,
      },
    });
  };

  const onClickEventTestBoard = async () => {
    setPostingProps('boardId', `${boardKind}`);
    postingId = await onAddSamplePosting(`${boardKind}`);
    setRenderWriting(false);
    navigateToPosting(postingId);
  }

  
    return(
      //insert case (not edit)
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
                  TestBoardChecker() ? 
                  await onClickEventTestBoard()
                  :
                  await onClickEvent(window.location.pathname)
                }}
              > Add </Button>
            </Grid>
          </Grid>
        </Box>  
      </form>
    )
     
}));