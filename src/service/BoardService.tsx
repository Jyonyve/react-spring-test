import axios from "axios";
import { types } from "mobx-state-tree";
import { BoardKind } from "../aggregate/BoardKind";

const BASE_URL: string = '/board';

const BoardService = types.model(
)
.actions(() => ({
    // 

    fetchBoardAndPosting :async (clubId:string, boardKind:BoardKind) => {
        let boardAndPostings : Map<string, object> = new Map();
        try{
            await axios.get(
                BASE_URL + "/" + clubId + "/" + boardKind,
                {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                        },
                    withCredentials: true,
                }
            )
            .then(
                fetchBoard => boardAndPostings = fetchBoard.data
            )
            if(boardAndPostings.size !== 0){
                console.log(`boardService: fetchBoardAndPosting : ${JSON.stringify(boardAndPostings)}`)
                return boardAndPostings;
            } else {
                throw new Error(`axios fail to get board info and postings.`)
            }
        }catch(error){
            console.error(`fetchBoard: one board fetchs error.`)
        }
    },

}));
export default BoardService;
