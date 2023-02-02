import {  castToSnapshot, types } from 'mobx-state-tree';
import {posting, defaultSnapshotPosting } from '../aggregate/Posting';
import PostingService from '../service/PostingService';


const PostingStore = types
.model(('postingStore'), {
    posting : types.optional(posting, castToSnapshot(defaultSnapshotPosting)),
    postingService : types.optional(PostingService, {})
})
.views(self => ({
    getPosting(){
        const posting = {...self.posting}
        return posting;
    },
}))
.actions((self => ({
    setPosting (posting :any) {
        self.posting = {...posting};
    },

    clearPosting() {
        self.posting = castToSnapshot(defaultSnapshotPosting);
    },

    async fetchPosting(postingId: string){
        try{
            let posting = await self.postingService.fetchPosting(postingId);
            this.setPosting(castToSnapshot(posting));
        } catch (error) {
            console.error(error);
        }
    },
})));
export default PostingStore;