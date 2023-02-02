import { types } from 'mobx-state-tree';
import { BoardKind } from './BoardKind';

export const Board = types.model({
    id : types.identifier,
    name : types.string,
    boardKind : types.string,
    createDate : types.string,
    clubId : types.string,
});

export const defaultSnapshotBoard = {
        id:'',
        name:'',
        boardKind: BoardKind[1],
        createDate: Date.now().toString(),
        clubId : ''
}