import { observer } from "mobx-react";
import BoardListViewAndNavlink from "../views/BoardListViewAndNavlink";

const BoardContainer = (observer((props:any) => {
    //
    const {clubId, clubName} = props;

    return(
            <BoardListViewAndNavlink
                clubId={clubId}
                clubName={clubName}
            />
    )

}));
export default BoardContainer;