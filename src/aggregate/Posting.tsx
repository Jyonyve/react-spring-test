import { types } from "mobx-state-tree";

export const posting = types.model({

    id : types.identifier,
    title: types.string,
    contents: types.optional(types.string,''),
    writerEmail : types.string,
    writtenDate : types.string,
    readCount : types.number,
    boardId :types.string,
})

export const defaultSnapshotPosting = {
    id:'',
    title: '',
    contents: '',
    writerEmail: '',
    writtenDate : Date.now().toString(),
    readCount : 0,
    boardId :''
}
