import { observer } from "mobx-react";
// import { useStore } from "../store/RootStore";
import BoardListViewAndNavlink from "../views/BoardListViewAndNavlink";

const BoardContainer = (observer((props:any) => {
    //
    const clubId : string = props.clubId;
    // const boards = useStore().boardStore.fetchBoards(clubId);

    return(
        <BoardListViewAndNavlink
            clubId={clubId}
            // boards = {boards}
        />
    )

}));
export default BoardContainer;