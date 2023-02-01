import {  castToSnapshot, types } from 'mobx-state-tree';
import { Board, defaultSnapshotBoard } from '../aggregate/Board';
import { BoardKind } from '../aggregate/BoardKind';
import BoardService from '../service/BoardService';


export const BoardStore = types
.model(('boardStore'), {
    board : types.optional(Board, castToSnapshot(defaultSnapshotBoard)),
    boards : types.array(Board),
    boardService : types.optional(BoardService, {})
})
.views(self => ({
    getMember(){
        const board = {...self.board}
        return board;
    },

    getMembers() {
        const boards = {...self.boards}
        return boards;
    },
}))
.actions((self => ({

    clearBoard() {
        self.board = castToSnapshot(defaultSnapshotBoard);
    },

    clearBoards() {
        self.boards.clear();
    },

    async fetchBoards(clubId :string) {
        try {
            this.clearBoards();
            let dbBoards : any;
            dbBoards = await self.boardService.fetchBoards(clubId);
            return dbBoards;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchBoard(clubId:string, boardKind: BoardKind){
        try{
            let dbBoard : any[] = await self.boardService.fetchBoard(clubId, boardKind);
            dbBoard.length !== 0 && !!dbBoard ? 
            self.board = castToSnapshot(dbBoard) : self.board = defaultSnapshotBoard;
        } catch (error) {
            console.error(error);
        }
    }

    // async setBoards() {
    //     try {
    //        let dbBoards :any[] = await this.fetchBoards();
    //        dbBoards = dbBoards.flat(Infinity);
    //             this.pushBoards(JSON.stringify(dbBoards)); 
    //     } catch (error) {
    //         console.error(error)
    //     }
    // },

    // pushBoards : (JSONBoards: string) => {
    //     let boardList :any[] = JSON.parse(JSONBoards);
    //     boardList.map(board => self.boards.push(castToSnapshot(board)))
    // },


    // editMember () {
    //     try {
    //         const targetMember = {...self.member}
    //         console.log(`editTargetMember : ${JSON.stringify(targetMember)}`)
    //         const id : string = self.member.id;
    //         let i = self.members.findIndex(member => member.id === id);
    //         self.memberService.editMember(id, targetMember);
    //         self.members.splice(i, 1, targetMember);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // },

    // deleteMember : () => {
    //     try {
    //             const id :string = self.member.id;
    //             console.log(id)
    //             let i = self.members.findIndex(member => member.id === id);
    //             self.members.splice(i, 1);    
    //             self.memberService.deleteMember(id); 
    //     } catch (error) {
    //         console.error(error);
    //     }

    // }

}
)));