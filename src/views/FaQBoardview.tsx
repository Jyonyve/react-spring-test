import { Accordion, AccordionSummary, Typography, Box, AccordionDetails,  Container, IconButton } from "@material-ui/core";
import { Cached, ExpandMore } from "@mui/icons-material";
import { observer } from "mobx-react";
import { castToSnapshot } from "mobx-state-tree";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultSnapshotBoard } from "../aggregate/Board";
import { useStore } from "../store/RootStore";
import { PostingInsertFormView } from "./PostingInsertFormView";
import WriteButton from "./WriteButton";

const FaQBoardView = observer((props:any) => {
    
    const {onFetchBoardAndPosting, clubName, onFetchSamplePostings} = props;

    //url Routing
    const urlparams = useParams();
    const clubId  = urlparams.clubId;
    const boardKind  = urlparams.boardKind;

    const [board, setBoard] = useState(defaultSnapshotBoard);
    const [renderWriting, setRenderWriting] = useState(false);

    const boardStore = useStore().boardStore;
    const postingStore = useStore().postingStore;
    
    async function af () {
      if(clubId !== undefined){
        await onFetchBoardAndPosting(clubId, boardKind); //fetch board info and posting list to state
        setBoard(castToSnapshot(boardStore.getBoard));
      } else {
        await onFetchSamplePostings(boardKind);
      }
    } 

 
    useEffect(() =>{
        af()
        // eslint-disable-next-line
      },[renderWriting])

    return (
        <Container>
            <Box margin={5}>
        <Typography color="initial">{`${board.boardKind} : ${board.name} - ${clubName}`}</Typography>
        {postingStore.postings.map( posting =>
                <Accordion key={posting.id}>
                <AccordionSummary
                id="panel1a-header"
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                >
                <Typography className="heading">{posting.title}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                <Typography>
                    {posting.contents}
                </Typography>
                </AccordionDetails>
                </Accordion>
            )}

            {      
              renderWriting===true  ?
              (postingStore.clearPosting(),
              <PostingInsertFormView 
                clubId={clubId}
                boardKind={boardKind}
                setRenderWriting={setRenderWriting}
                {...props}
              />)
              :
              null
            }
            {WriteButton(boardKind, renderWriting, setRenderWriting)}
            <IconButton children={<Cached/>} size="small" onClick={ async () => await af()}/>
                
            </Box>
        </Container>
      );
}
)
export default FaQBoardView;