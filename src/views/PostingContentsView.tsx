import { observer } from "mobx-react";
import { TextField, Grid, Paper, Box, InputAdornment } from '@material-ui/core';
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../store/RootStore";
import { StyledButton } from "../component/importedViewComponent/AppButton";
import { defaultSnapshotPosting } from "../aggregate/Posting";
import { castToSnapshot } from "mobx-state-tree";
import {  Edit } from "@material-ui/icons";
import { CommentList } from "./CommentList";


const PostingContentsView = observer((props:any) => {
    // const {posting} = props;
    const location = useLocation();
    const {postingId, boardId} = location.state;
    const postingStore :any = useStore().postingStore;
    const commentStore:any = useStore().commentStore;

    const [showPosting, setShowPosting] = useState(defaultSnapshotPosting);
    const [showComments, setShowComments] = useState<any[]>();
    const [iconColor, setIconColor] = useState("primary");


    async function af() {
        if(location.pathname === `/board/posting/${postingId}`){
            let posting = await postingStore.fetchPosting(postingId);
            setShowPosting(castToSnapshot(posting));
            let comments :[] = await commentStore.fetchComments(postingId)
            setShowComments(comments)
        }else{
            postingStore.clearPosting();
        }
    }

    useEffect(() => {
       af();
       console.log(`location-pathname`)
        // eslint-disable-next-line
    },[location.pathname])
    

    useEffect(()=>{
        console.log(`showComments : ${JSON.stringify(showComments)}`)
    },[showComments])


    const onSetCommentProps = (name: string, value:string) => {
        commentStore.setCommentProps(`${name}`, value);
    }

    return(
        <Box width="100%" overflow="auto">
        <nav>
        <Grid container component={Paper} alignContent="center" spacing={1}>
        
            <Grid item xs={12}>
                <TextField 
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                    variant="filled"
                    label= "title"  
                    value={showPosting.title}
                    size='small'      
                />
            </Grid>
            <Grid item xs={12} >
                <TextField 
                    InputProps={{
                        readOnly: true,
                      }}
                    multiline
                    variant="outlined"
                    fullWidth
                    value={showPosting.contents}
                    label="contents"     
                    size='medium'   
                />
            </Grid>
            <Grid item xs={12} >
            { Array.isArray(showComments) && showComments.length !== 0? 
                showComments.map( comment1 => 
                    <CommentList key={comment1.id} comment={comment1} onSetCommentProps={onSetCommentProps} commentStore={commentStore}
                                postingId={postingId} setShowComments={setShowComments} iconColor={iconColor} setIconColor={setIconColor}
                    />
                )
            :
                <TextField 
                    margin="dense"
                    disabled
                    variant="outlined"
                    defaultValue={`no comments now.`}
                />
            }
            </Grid> 
            <Grid item xs={12}>
                <TextField 
                    multiline
                    variant="standard"
                    fullWidth
                    defaultValue=" write new comment here"
                    color="secondary"      
                    size='medium' 
                    label="new Comment"     
                    InputProps={{
                        endAdornment: <InputAdornment position="end" children={<Edit style={{ color: `${iconColor}` }}/>} onClick={ async () =>{
                            setIconColor("secondary")
                            onSetCommentProps('postingId', postingId)
                            await commentStore.addCommentAndSetCommentInfo(postingId)
                            setShowComments(castToSnapshot(commentStore.comments))
                        }}></InputAdornment>
                    }}
                    onChange={(event) => onSetCommentProps('contents', event.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
                    <StyledButton size="small" variant="outlined" color="success">
                        Update
                    </StyledButton>
                    <StyledButton size="small" variant="outlined" color="error">
                        Delete
                    </StyledButton>
                    <StyledButton size="small" variant="outlined" color="warning">
                        <NavLink to ={`/board/${boardId}`} >List</NavLink>
                    </StyledButton>
            </Grid>
        </Grid>
        </nav>
        </Box>
    );
}); export default PostingContentsView;