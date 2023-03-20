import { Box, Container, InputAdornment, TextField } from "@material-ui/core"
import { BorderColor, Delete } from "@material-ui/icons";
import { observer } from "mobx-react";
import { useStore } from "../store/RootStore";

export const CommentEdit = observer((props:any) => {
    //
    const commentStore = useStore().commentStore;
    const {comment,commentNumber, postingId, setReadOnly} = props;

    const modifyComment = () => {
        commentStore.setCommentProps('id', comment.id)
        commentStore.setCommentProps('writerEmail', comment.writerEmail)
        commentStore.setCommentProps('postingId', postingId)
        commentStore.setCommentProps('commentNumber', +commentNumber)
        commentStore.editComment()
        setReadOnly(true)
    }

    return(
        <Container>
            <Box width="100%" overflow="auto" >
                {console.log(`commentEdit`)}
                <TextField 
                    margin="dense"
                    multiline
                    label={comment.writerEmail ? comment.writerEmail : 'TEST'}
                    variant="outlined"
                    defaultValue={comment.contents}
                    size="medium"
                    fullWidth
                    color="secondary"      
                    InputProps={{
                        endAdornment: 
                        <>
                            <InputAdornment position="start" 
                            children={<BorderColor fontSize="small" color="action"/>} onClick={ () =>{
                                modifyComment()
                            }
                            }></InputAdornment>
                            <InputAdornment position="end" children={<Delete fontSize="small" color="inherit"/>} 
                                onClick={() => {
                                    commentStore.setCommentProps('id', comment.id)
                                    commentStore.deleteComment()
                                    commentStore.clearComment()
                                }
                                }></InputAdornment>
                        </>
                    }}
                    onChange={(event) => commentStore.setCommentProps('contents', event.target.value)}
                />
            </Box>
        </Container>    
    )
});