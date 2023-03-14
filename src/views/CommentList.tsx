import { InputAdornment, TextField } from "@material-ui/core"
import { BorderColor } from "@material-ui/icons";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { getCurrentEmail, TestBoardChecker } from "../component/Rolechecker";
import { CommentEdit } from "./CommentEdit";

export const CommentList = observer((props:any) => {

    const { comment, iconColor, postingId} = props;

    const commentId :string = comment.id;
    const commentNumber = commentId.replace(postingId+"/", "");

    const [readOnly, setReadOnly] = useState(true);

    useEffect(()=>{
        console.log(JSON.stringify(comment))
        // eslint-disable-next-line
    },[readOnly])

    function authorChecker(comment :any){
        comment.writerEmail === getCurrentEmail() ?
        setReadOnly(false)
        :
        alert("not my comment!")
    }
    
    return(
        <nav>
                { readOnly
                ?
                    <TextField 
                    margin="dense"
                    multiline
                    label={comment.writerEmail ? comment.writerEmail : 'TEST'} 
                    variant="outlined"
                    fullWidth
                    value= {comment.contents}
                    color="secondary"      
                    size='small'
                        InputProps={{
                        readOnly: true,
                        endAdornment: <InputAdornment position="end" children={<BorderColor style={{ color: `${iconColor}` }}/>} onClick={ () =>{
                                TestBoardChecker() ? setReadOnly(false) : authorChecker(comment)
                        } }></InputAdornment>
                        }}
                    />
                :
                    <CommentEdit setReadOnly={setReadOnly} commentNumber={commentNumber} {...props}/>
                    
                }
        </nav>        
    )
});