import {  castToSnapshot, types } from 'mobx-state-tree';
import { Comment, defaultSnapshotComment } from '../aggregate/Comment';
import { TestBoardChecker } from '../component/Rolechecker';
import CommentService from '../service/CommentService';
import TestService from '../service/TestService';


const CommentStore = types
.model(('commentStore'), {
    comment : types.optional(Comment, castToSnapshot(defaultSnapshotComment)),
    comments : types.array(Comment),
    commentService : types.optional(CommentService, {}),
    testService: types.optional(TestService, {})
})
.views(self => ({
    getComment(){
        const comment = {...self.comment}
        return comment;
    },
    getComments() {
        const comments :any[] = {...self.comments}
        return comments;
    },
    getOneComment(commentId:string){
        const comment = self.comments.filter( comment => comment.id === commentId);
        return comment
    }
}))
.actions((self => ({
    setComment (comment :any) {
        self.comment = {...comment}
    },

    setCommentProps(name:string, value:string|number){
        self.comment = {
            ...self.comment,
            [name] : value
        }
    },

    addOneCommentToComments(){
        self.comments.push({...self.comment});
    },

    clearComment() {
        self.comment = castToSnapshot(defaultSnapshotComment);
    },

    clearComments(){
        self.comments.clear();
    },

    async fetchComments (postingId:string) {
        this.clearComments();
        const dbComments: []|undefined = await self.commentService.fetchComments(postingId)
        this.setComments(dbComments!);
        console.log(JSON.stringify(dbComments))
        return self.comments
    },
    
    async setComments(dbComments:[]){
        dbComments!.forEach(comment => {
            self.comments.push(comment)
        });
    },

    async addCommentAndSetCommentInfo(postingId:string) {
        let dbComment : []|undefined =[];
        try{
            let comment = {...self.comment};
            dbComment = await self.commentService.addComment(comment)
            this.setComment(castToSnapshot(dbComment))
            this.addOneCommentToComments();
            console.log(JSON.stringify(self.comments))
        } catch(error){
            console.log(error);
        }
    },

    editComment(){
        try{
            const targetComment = {...self.comment}
            console.log(`editTargetComment : ${JSON.stringify(targetComment)}`)
            const id : string = targetComment.id;
            let i = self.comments.findIndex(comment => comment.id === id);
            if(TestBoardChecker()){
                self.testService.editComment(targetComment)
            } else{
                self.commentService.editComment(targetComment);
            }
            self.comments.splice(i, 1, targetComment);
        }catch(error){
            console.error(error);
        }
    },

    deleteComment(){
        try{
            const commentId = self.getComment().id;
            let i = self.comments.findIndex(comment => comment.id === commentId);
            self.comments.splice(i, 1);
            if(TestBoardChecker()){
                self.testService.deleteComment(commentId);
            } else{
                self.commentService.deleteComment(commentId);
            }
            
        }catch(error){
            console.log(error)
        }
    },

    async fetchSampleComments(postingId: string){
        this.clearComments();
        const dbComments: []|undefined = await self.testService.fetchSampleComments(postingId)
        this.setComments(dbComments!);
        return self.comments;
    },

    async addSampleComment(postingId:string) {
        try{
            let comment = self.getComment();
            comment = await self.testService.addComment(postingId, comment)
            this.setComment(castToSnapshot(comment))
            this.addOneCommentToComments();
        } catch(error){
            console.log(error);
        }
    },
})));
export default CommentStore;