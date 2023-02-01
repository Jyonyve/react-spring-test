import { types } from 'mobx-state-tree';

export const club = types.model({
    id : types.identifier,
    name : types.string,
    intro : types.string,
    foundationTime : types.number
});

export const defaultSnapshot = {
        id:'',
        name:'',
        intro:'',
        foundationTime:0,
}