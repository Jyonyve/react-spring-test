import axios from "axios";
import { types } from "mobx-state-tree";
import { BoardKind } from "../aggregate/BoardKind";

const BASE_URL: string = '/board';

const BoardService = types.model(
)
.actions(() => ({
    fetchBoards : async (clubId:string) => {
        let boards : any[] = []; //배열타입 명시해주지 않으면 never라고 인식해서 초기화가 제대로 안됨
        try {
            await axios.get(
                BASE_URL+"/"+clubId,
                {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                        },
                    withCredentials: true,
                })
            .then(board => boards.push(board.data));
            if(boards !== undefined){
                // console.log(JSON.stringify(members));
                return boards;
            }else {
                throw new Error(`fetchBoards Cannot be undefined.`)
            }
            
        } catch (error) {
            console.error(error);
        }
    },

    fetchBoard :async (clubId:string, boardKind:BoardKind) => {
        let board : any;
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
                fetchBoard => board = fetchBoard.data
            )
            if(board !== undefined){
                return board;
            } else {
                throw new Error(`axios fail to get one board.`)
            }
        }catch(error){
            console.error(`fetchBoard: one board fetchs error.`)
        }
    },
}));
export default BoardService;
