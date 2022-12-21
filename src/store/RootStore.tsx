import React, { createContext } from "react";
import {types, Instance,  castToSnapshot, } from 'mobx-state-tree'
import ClubStore, { defaultSnapshot } from "./ClubStore";
//import { MemberStore } from "./MemberStore";

export const rootStore = types.model({
    //memberStore : MemberStore,
    clubStore : ClubStore,
}).create({
    //memberStore : { member : '', members : [], searchText:'' },
    clubStore : { club : castToSnapshot(defaultSnapshot), clubs:[], searchText:''},
});

const RootStoreContext = createContext<Instance<typeof rootStore>|null>(null);
export const StoreProvider = RootStoreContext.Provider;

export function useStore(){
    const store = React.useContext(RootStoreContext);
    if(store===null){
        throw new Error(`store cannot be null. add a context provider`);
    }
    return store;
}

