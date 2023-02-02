import { Box, Paper } from "@material-ui/core";
import { observer } from "mobx-react";
import { BoardKind } from "../aggregate/BoardKind";
import { useStore } from "../store/RootStore";
import PaginationTable from "../views/PaginationTable";
import { PostingEditFormView } from "../views/PostingEditFormView";

const PostingListContainer = (observer((props:any) =>{

    const boardStore = useStore().boardStore;
    const postingStore = useStore().postingStore;

    const onFetchBoardAndPosting= (clubId :string, boardKind: BoardKind) => {
        boardStore.setPostings(clubId, boardKind);
    }
    const onSetPosting=( postingId :string)=>{
        postingStore.fetchPosting(postingId);
    }

    return(
        <Box component={Paper}>
            <PostingEditFormView
            boardStore = {boardStore}
            postingStore={postingStore}
            />
        
            < PaginationTable
            onFetchBoardAndPosting={onFetchBoardAndPosting}
            clubName={localStorage.getItem('clubName')}
            onSetPosting={onSetPosting} 
        />
        </Box>
    )
}))
export default PostingListContainer;