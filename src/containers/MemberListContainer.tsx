import { observer } from "mobx-react";
import React, { useEffect } from "react";
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

    const onSetMembers = () => {
        memberStore.setMembers();
    }

    function flatMembers (){
        return memberStore.members.flat(Infinity);
    }

    let searchText = memberStore.getSearchText();
    let members = flatMembers().filter(member => member.email.toLowerCase().indexOf(searchText.toLowerCase()));
    
    useEffect( () => onSetMembers);

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