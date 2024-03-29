import React, { createContext } from "react";
import {types, Instance,  castToSnapshot, } from 'mobx-state-tree'
import ClubStore from "./ClubStore";
import { MemberStore } from "./MemberStore";
import { defaultSnapshotMember } from "../aggregate/Member";
import { defaultSnapshot } from "../aggregate/Club";
import { BoardStore } from "./BoardStore";
import { defaultSnapshotBoard } from "../aggregate/Board";
import PostingStore from "./PostingStore";
import { defaultSnapshotPosting } from "../aggregate/Posting";
import CommentStore from "./CommentStore";
import { defaultSnapshotComment } from "../aggregate/Comment";
import MembershipStore from "./MembershipStore";
import { defaultSnapshotMembership } from "../aggregate/Membership";

export const rootStore = types.model({
    memberStore : MemberStore,
    clubStore : ClubStore,
    boardStore : BoardStore,
    postingStore : PostingStore,
    commentStore : CommentStore,
    membershipStore : MembershipStore,
}).create({
    memberStore : { member : castToSnapshot(defaultSnapshotMember), members : [], searchText:'' },
    clubStore : { club : castToSnapshot(defaultSnapshot), clubs:[], searchText:''},
    boardStore : { board : castToSnapshot(defaultSnapshotBoard), boards : []},
    postingStore : {posting: castToSnapshot(defaultSnapshotPosting), postings:[]},
    commentStore : {comment:castToSnapshot(defaultSnapshotComment), comments:[]},
    membershipStore : {membership:castToSnapshot(defaultSnapshotMembership), memberships:[]},
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

