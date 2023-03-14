import {  castToSnapshot, types } from 'mobx-state-tree';
import { Board, defaultSnapshotBoard } from '../aggregate/Board';
import { BoardKind } from '../aggregate/BoardKind';
import BoardService from '../service/BoardService';
import TestService from '../service/TestService';


export const BoardStore = types
.model(('boardStore'), {
    board : types.optional(Board, castToSnapshot(defaultSnapshotBoard)),
    boards : types.array(Board),
    boardService : types.optional(BoardService, {}),
    testService :  types.optional(TestService, {})
})
.views(self => ({
    getBoard(){
        const board = {...self.board}
        return board;
    },

    getBoards() {
        const boards = {...self.boards}
        return boards;
    },
    
}))
.actions((self => ({
    setBoard (board :any) {
        self.board = {...board};
    },
    setBoardProps (name:string, value: string){
        self.board={...self.board,
        [name] : value}
    },

    clearBoard() {
        self.board = castToSnapshot(defaultSnapshotBoard);
    },

    clearBoards() {
        self.boards.clear();
    },

    async addBoard(boardKind : string) {
        try{
            self.testService.addSampleBoard(boardKind);
        } catch (error) {
            console.error(error);
        }
    },

    async fetchBoardAndPosting(clubId:string, boardKind: BoardKind){
        try{
            let dbBoardAndPostings : Map<string, object>|undefined = await self.boardService.fetchBoardAndPosting(clubId, boardKind);
            const dbBoardAndPostingsString = JSON.stringify(dbBoardAndPostings);
            //setting board info and return postings
            if (!!dbBoardAndPostings && dbBoardAndPostings.size !== 0 ){
                this.setBoard({...castToSnapshot(JSON.parse(dbBoardAndPostingsString)['board'])})
                const dbPostings :[] = JSON.parse(dbBoardAndPostingsString)['postings'];
                // console.log(JSON.stringify(dbPostings))
                return JSON.stringify(dbPostings);
            }
            else {
                throw new Error(`cannot define board info in fetchBoardAndPosting/boardservice`)
            }
        } catch (error) {
            console.error(error);
        }
    },  
}
)));