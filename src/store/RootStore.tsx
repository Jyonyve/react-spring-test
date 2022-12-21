import React, { createContext } from "react";
import {types, Instance} from 'mobx-state-tree'
import { MemberStore } from "./MemberStore";
import ClubStore from "./ClubStore";

export const rootStore = types.model({
    memberStore : MemberStore,
    clubStore : ClubStore,
}).create({
    memberStore : { member : '', members : [], searchText:'' },
    clubStore : { club : undefined, clubs : [], searchText : '' }
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
