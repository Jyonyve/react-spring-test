import { types } from 'mobx-state-tree';
import { BoardKind } from './BoardKind';

export const Board = types.model({
    id : types.identifier,
    name : types.string,
    boardKind : types.number,
    createDate : types.number,
    clubId : types.string,
});

export const defaultSnapshotBoard = {
        id:'',
        name:'',
        boardKind: BoardKind.FAQBOARD,
        createDate:0,
        clubId : ''
}