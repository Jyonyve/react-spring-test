import { Box, Container, InputAdornment, TextField } from "@material-ui/core"
import { BorderColor } from "@material-ui/icons";
import { observer } from "mobx-react";
import { useStore } from "../store/RootStore";

export const CommentEdit = observer((props:any) => {

    // const location = useLocation();
    // const { comment, postingId} = location.state;
    const commentStore = useStore().commentStore;
    const {comment,commentNumber, postingId, setReadOnly} = props;


    return(
        <Container>
            <Box width="100%" overflow="auto" >
                {console.log(`commentEdit`)}
                <TextField 
                    margin="dense"
                    multiline
                    label={comment.writerEmail}
                    variant="outlined"
                    defaultValue={comment.contents}
                    size="medium"
                    fullWidth
                    color="secondary"      
                    InputProps={{
                        endAdornment: <InputAdornment position="end" children={<BorderColor color="action"/>} onClick={ () =>{
                            commentStore.setCommentProps('id', comment.id)
                            commentStore.setCommentProps('writerEmail', comment.writerEmail)
                            commentStore.setCommentProps('postingId', postingId)
                            commentStore.setCommentProps('commentNumber', +commentNumber)
                            commentStore.editComment()
                            setReadOnly(true)
                        } }></InputAdornment>
                    }}
                    onChange={(event) => commentStore.setCommentProps('contents', event.target.value)}
                />
            </Box>
        </Container>    
    )
});