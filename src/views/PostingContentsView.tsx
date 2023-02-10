import { observer } from "mobx-react";
import { TextField, Grid, Paper, Box, InputAdornment, Container, Typography } from '@material-ui/core';
import { NavLink, useLocation } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { useStore } from "../store/RootStore";
import { StyledButton } from "../component/importedViewComponent/AppButton";
import { defaultSnapshotPosting } from "../aggregate/Posting";
import { castToSnapshot } from "mobx-state-tree";
import {  Edit } from "@material-ui/icons";
import { CommentList } from "./CommentList";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { PostingEditFormView } from "./PostingEditFormView";
import { adminChecker } from "../component/Rolechecker";


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
        // eslint-disable-next-line
    },[location.pathname])
    
    const onSetCommentProps = (name: string, value:string) => {
        commentStore.setCommentProps(`${name}`, value);
    }

    return(
        <Box width="100%" overflow="auto">
            {console.log(`postingContentsView`)}
        <nav>
        <Grid container component={Paper} alignContent="center" spacing={2}>
        
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
            <Grid item xs={7}>
            </Grid>
            <Grid item xs={5}>
                    {
                        adminChecker()||localStorage.getItem('clubRoles')?.includes(showPosting.writerEmail)
                    ?
                    <><Popup trigger={<StyledButton size="small" variant="outlined" color="success"> Update</StyledButton>} position="bottom center" modal nested>
                                    {((close: any) => (
                                        <PostingEditFormView showPosting={showPosting} setShowPosting={setShowPosting} close={close} {...props} />
                                    )) as unknown as ReactNode}
                                </Popup><Popup trigger={<StyledButton size="small" variant="outlined" color="error"> Delete</StyledButton>} position="top center" modal nested>
                                        {((close: any) => (
                                            <Box className="modal">
                                                <Container>
                                                    <Typography align="center" color="textPrimary"> Rly wanna deletin'? </Typography>
                                                    <Box textAlign="center">
                                                        <NavLink to={`/board/${boardId}`}>
                                                            <StyledButton size="small" variant="contained" color="error" onClick={() => {
                                                                postingStore.deletePosting();
                                                                postingStore.clearPosting();
                                                                close();
                                                            } }> Delete </StyledButton>
                                                        </NavLink>
                                                        <NavLink to={`/board/${boardId}`}>
                                                            <StyledButton size="small" variant="contained" color="inherit"
                                                                onClick={() => {
                                                                    console.log('modal closed ');
                                                                    close();
                                                                } }
                                                            >
                                                                close
                                                            </StyledButton>
                                                        </NavLink>
                                                    </Box>
                                                </Container>
                                            </Box>
                                        )) as unknown as ReactNode}
                                    </Popup></>
                    :
                    <StyledButton size="small" variant="outlined" color="warning">Not my post</StyledButton>
                    }

                    <StyledButton size="small" variant="outlined" color="secondary" onClick={postingStore.clearPosting()}>
                        <NavLink to ={`/board/${boardId}` } >List</NavLink>
                    </StyledButton>
            </Grid>
        </Grid>
        </nav>
        </Box>
    );
}); export default PostingContentsView;