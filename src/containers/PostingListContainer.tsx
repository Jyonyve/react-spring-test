import { Box } from "@material-ui/core";
import { observer } from "mobx-react";
import { BoardKind } from "../aggregate/BoardKind";
import { useStore } from "../store/RootStore";
import PaginationTable from "../views/PaginationTable";

const PostingListContainer = (observer((props:any) =>{

    const boardStore = useStore().boardStore;
    const postingStore = useStore().postingStore;

    const onFetchBoardAndPosting= async (clubId :string, boardKind : BoardKind) => {
        const dbPostings :string|undefined = await boardStore.fetchBoardAndPosting(clubId, boardKind);
        postingStore.fetchPostings(dbPostings!);
    };

    const onFetchPosting=( postingId :string)=>{
        postingStore.fetchPosting(postingId);
    };

    const onAddPosting = (boardId : string) =>{
        console.log(boardId)
        postingStore.addPostingAndSetId(boardId);
        postingStore.addOnePostingtoPostings();
    };

    const onSetPostingProps =(name:string, value:string) =>{
        postingStore.setPostingProps(name, value);
    }

    return(
        <Box >      
            < PaginationTable 
            onFetchBoardAndPosting={onFetchBoardAndPosting}
            clubName={localStorage.getItem('clubName')}
            onFetchPosting={onFetchPosting} 
            onAddPosting={onAddPosting}
            onSetPostingProps={onSetPostingProps}
            posting={postingStore.posting}
        />
        </Box>
    )
}))
export default PostingListContainer;