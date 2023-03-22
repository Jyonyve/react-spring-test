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
import { adminChecker, TestBoardChecker } from "../component/Rolechecker";


const PostingContentsView = observer((props:any) => {
    const location = useLocation();

    const {postingId , boardId ,pathlocation} = location.state;
    
    const postingStore :any = useStore().postingStore;
    const commentStore:any = useStore().commentStore;

    const [showPosting, setShowPosting] = useState(defaultSnapshotPosting);
    const [showComments, setShowComments] = useState<any[]>([]);
    const [iconColor, setIconColor] = useState("primary");
    const clubId = (boardId as string).split("/")[0]

    async function af() {
        console.log(`posting, pathlocation:${pathlocation}`)
        let posting = await postingStore.fetchPosting(postingId);
        setShowPosting(castToSnapshot(posting));
        let comments :[] = await commentStore.fetchComments(postingId)
        setShowComments(comments)
    }

   async function samplePosting(){
        console.log('samplePosting')
        await postingStore.fetchSamplePosting(postingId);
        const posting = postingStore.getPosting()
        setShowPosting(castToSnapshot(posting));
        sampleComments();
   }

   async function sampleComments() {
        console.log('sampleComments')
        let comments :[] = await commentStore.fetchSampleComments(postingId)
        setShowComments(comments);
   } 

    useEffect(() => {
       TestBoardChecker() ? samplePosting() : af();
        // eslint-disable-next-line
    },[location.pathname])
    
    const onSetCommentProps = (name: string, value:string) => {
        commentStore.setCommentProps(`${name}`, value);
    }

    return(
        <Box width="100%" overflow="auto">
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
                    label={`${showPosting.writerEmail}` ? `Author : ${showPosting.writerEmail}` : "TEST" }
                    size='medium'   
                />
            </Grid>
            <Grid item xs={12} >
                { showComments && Array.isArray(showComments) ? 
                    showComments.map( comment1 => 
                        <CommentList key={comment1.id} comment={comment1} onSetCommentProps={onSetCommentProps} commentStore={commentStore} clubid={clubId}
                                    postingId={postingId} setShowComments={setShowComments} iconColor={iconColor} setIconColor={setIconColor} pathlocation={pathlocation}
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
                {
                !`${pathlocation}`.includes("NOTICEBOARD")
                ?
                <TextField 
                    multiline
                    variant="standard"
                    fullWidth
                    defaultValue=" write new comment here"
                    color="secondary"      
                    size='medium' 
                    label="new comment"     
                    InputProps={{
                        endAdornment: <InputAdornment position="end" children={<Edit style={{ color: `${iconColor}` }}/>} onClick={ async () =>{
                            setIconColor("secondary")
                            onSetCommentProps('postingId', postingId);
                            (TestBoardChecker()
                                ? await commentStore.addSampleComment(postingId)
                                : await commentStore.addCommentAndSetCommentInfo(postingId));
                        }}></InputAdornment>
                    }}
                    onChange={(event) => onSetCommentProps('contents', event.target.value)}
                    />
                :
                void(0)
                }
            </Grid>
            <Grid item xs={7}>
            </Grid>
            <Grid item xs={5}>
                    {
                        adminChecker()||localStorage.getItem('clubRoles')?.includes(showPosting.writerEmail)
                    ?
                    <><Popup trigger={<StyledButton size="small" variant="outlined" color="success"> Update</StyledButton>} position="bottom center" modal nested>
                                    {((close: any) => (
                                        <PostingEditFormView showPosting = {castToSnapshot(showPosting)} setShowPosting={setShowPosting} close={close} {...props} />
                                    )) as unknown as ReactNode}
                                </Popup><Popup trigger={<StyledButton size="small" variant="outlined" color="error"> Delete</StyledButton>} position="top center" modal nested>
                                        {((close: any) => (
                                            <Box className="modal">
                                                <Container>
                                                    <Typography align="center" color="textPrimary"> Rly wanna deletin'? </Typography>
                                                    <Box textAlign="center">
                                                        <NavLink to={`/board/${boardId}`}>
                                                            <StyledButton size="small" variant="contained" color="error" onClick={() => {
                                                                postingStore.deletePosting(postingId);
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

                    <StyledButton size="small" variant="outlined" color="secondary" onClick={ () =>
                        {postingStore.clearPosting();
                        }}>
                        <NavLink to ={TestBoardChecker() ? `/test/${showPosting.boardId}`: `/board/${showPosting.boardId}`} >
                            List</NavLink>
                    </StyledButton>
            </Grid>
        </Grid>
        </nav>
        </Box>
    );
}); export default PostingContentsView;