import { types } from "mobx-state-tree";

export const Comment = types.model({

    id : types.identifier,
    contents: types.optional(types.string,''),
    writerEmail : types.string,
    writtenDate : types.string,
    postingId :types.string,
    commentNumber: types.number,
})

export const defaultSnapshotComment = {
    id:'',
    contents: '',
    writerEmail: '',
    writtenDate : Date.now().toString(),
    postingId :'',
    commentNumber: 0,
}
