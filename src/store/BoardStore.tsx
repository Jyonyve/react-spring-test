import {  castToSnapshot, types } from 'mobx-state-tree';
import { Board, defaultSnapshotBoard } from '../aggregate/Board';
import { BoardKind } from '../aggregate/BoardKind';
import posting from '../aggregate/Posting';
import BoardService from '../service/BoardService';


export const BoardStore = types
.model(('boardStore'), {
    board : types.optional(Board, castToSnapshot(defaultSnapshotBoard)),
    boards : types.array(Board),
    postings : types.array(posting),
    boardService : types.optional(BoardService, {})
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
    getPostings() {
        const postings = {...self.postings}
        return postings;
    },
}))
.actions((self => ({
    setBoard (board :any) {
        self.board = {...board};
    },

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

    async fetchBoardAndPosting(clubId:string, boardKind: BoardKind){
        try{
            let dbBoardAndPostings : Map<string, object>|undefined = await self.boardService.fetchBoard(clubId, boardKind);
            const dbBoardAndPostingsString = JSON.stringify(dbBoardAndPostings);
            if (!!dbBoardAndPostings && dbBoardAndPostings.size !== 0 ){
                this.setBoard({...castToSnapshot(JSON.parse(dbBoardAndPostingsString)['board'])})
                const dbPostings :[] = JSON.parse(dbBoardAndPostingsString)['postings'];
                return dbPostings;
            }
            else {
                throw new Error(`cannot define board info in fetchBoardAndPosting/boardservice`)
            }
        } catch (error) {
            console.error(error);
        }
    },

    async setPostings (clubId:string, boardKind: BoardKind) {
        let dbPostings = await this.fetchBoardAndPosting(clubId, boardKind);
        dbPostings!.flatMap(posting => self.postings.push(castToSnapshot(posting)))
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