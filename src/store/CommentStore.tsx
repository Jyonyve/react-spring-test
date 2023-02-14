import {  castToSnapshot, types } from 'mobx-state-tree';
import { Comment, defaultSnapshotComment } from '../aggregate/Comment';
import CommentService from '../service/CommentService';


const CommentStore = types
.model(('commentStore'), {
    comment : types.optional(Comment, castToSnapshot(defaultSnapshotComment)),
    comments : types.array(Comment),
    commentService : types.optional(CommentService, {})
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
            self.commentService.editComment(targetComment);
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
            self.commentService.deleteComment(commentId);
        }catch(error){

        }
    }


})));
export default CommentStore;