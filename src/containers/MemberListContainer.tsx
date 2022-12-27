import { observer } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
import React from "react";
import Member from "../aggregate/Member";
import { useStore } from "../store/RootStore";
import { MemberListView } from "../views/MemberListView";

export const MemberListContainer = (observer(() => {
    
    const memberStore = useStore().memberStore;

    const onSetMember = (member : typeof Member) => {
        memberStore.setMember(member);
    }

    const onSetMemberProps = (name:string, value : string) => {
        memberStore.setMemberProps(name, value);
    }

    function onSetMembers () {
        memberStore.setMembers();
    }

    let searchText:string = memberStore.getSearchText();

    let members = getSnapshot(memberStore.members);
    members = members.filter(member => member.email.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

    return(
        <MemberListView
            member = {memberStore.member}
            members = {members}
            onSetMember = {onSetMember}
            onSetMemberProps = {onSetMemberProps}
            onSetMembers = {onSetMembers}
        />
    )

}));