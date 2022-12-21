import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import Member from "../aggregate/Member";
import { rootStore } from "../store/RootStore";
import { MemberListView } from "../views/MemberListView";

export const MemberListContainer = inject('rootStore')(observer(() => {
    
    const memberStore = rootStore.memberStore;

    const onSetMember = (member : typeof Member) => {
        memberStore.setMember(member);
    }

    const onSetMemberProps = (name:string, value : string) => {
        memberStore.setMemberProps(name, value);
    }

    const onSetMembers = () => {
        memberStore.setMembers();
    }

    useEffect( () => onSetMembers);

    return(
        <MemberListView
            member = {memberStore.member}
            members = {memberStore.members}
            onSetMember = {onSetMember}
            onSetMemberProps = {onSetMemberProps}
            onSetMembers = {onSetMembers}
        />
    )

}));