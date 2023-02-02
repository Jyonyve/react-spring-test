import { BoardKind } from "../aggregate/BoardKind";
import { useStore } from "../store/RootStore";
import PaginationTable from "../views/PaginationTable";

const PostingListContainer = (props:any) =>{

    const boardStore = useStore().boardStore;

    const onFetchBoardAndPosting= (clubId :string, boardKind: BoardKind) => {
        boardStore.setPostings(clubId, boardKind);
    }

    return(
        <PaginationTable 
            onFetchBoardAndPosting={onFetchBoardAndPosting}
            clubName={localStorage.getItem('clubName')}
         />
    )
}
export default PostingListContainer;