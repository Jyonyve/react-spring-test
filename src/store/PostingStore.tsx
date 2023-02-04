import {  castToSnapshot, types } from 'mobx-state-tree';
import {posting, defaultSnapshotPosting } from '../aggregate/Posting';
import PostingService from '../service/PostingService';


const PostingStore = types
.model(('postingStore'), {
    posting : types.optional(posting, castToSnapshot(defaultSnapshotPosting)),
    postings : types.array(posting),
    postingService : types.optional(PostingService, {})
})
.views(self => ({
    getPosting(){
        const posting = {...self.posting}
        return posting;
    },
    getPostings() {
        const postings :any[] = {...self.postings}
        return postings;
    },
}))
.actions((self => ({
    setPosting (posting :any) {
        self.posting = {...posting};
    },

    setPostingProps(name:string, value:string){
        self.posting = {
            ...self.posting,
            [name] : value
        }
    },

    addOnePostingtoPostings(){
        self.postings.push({...self.posting});
    },

    clearPosting() {
        self.posting = castToSnapshot(defaultSnapshotPosting);
    },

    clearPostings(){
        self.postings.clear();
    },

    fetchPostings (dbPostings : string) {
        this.clearPostings();
        const jsonPostings :any[] = JSON.parse(dbPostings);
        if(jsonPostings && Array.isArray(jsonPostings))
        {// eslint-disable-next-line 
            jsonPostings.map(posting => {
                self.postings.push(castToSnapshot(posting))});
        };
    },

    async fetchPosting(postingId: string){
        try{
            let posting = await self.postingService.fetchPosting(postingId);
            this.setPosting(castToSnapshot(posting));
        } catch (error) {
            console.error(error);
        }
    },

    async addPostingAndSetId(boardId:string) {
        try{
            let insertPosting = {...self.posting};
            let id : string|undefined = await self.postingService.addPosting(boardId, insertPosting);
            console.log(`postingId : ${id}`);
            this.setPostingProps('id', id!)
        } catch(error){
            console.log(error);
        }
    },


})));
export default PostingStore;