import { types } from "mobx-state-tree";

const posting = types.model({

    id : types.identifier,
    title: types.string,
    contents: types.optional(types.string,''),
    writerEmail : types.string,
    writtenDate : types.string,
    readCount : types.number,
    boardId :types.string,
})
export default posting;

export const defaultSnapshotPosting = {
    id:'',
    title: '',
    contents: '',
    writerEmail: '',
    writtenDate : 0,
    readCount : 0,
    boardId :''
}
