import { observer } from "mobx-react"
import React from "react";
import { useStore } from "../store/RootStore";
import { MemberEditformView } from "../views/MemberEditFormView";

export const MemberEditFormContainer = (observer((props:any) => {
    
    const memberStore = useStore().memberStore;
    const id_token = props.id_token;

    const onSetMemberProps =(name:string, value:string) =>{
        memberStore.setMemberProps(name, value);
    }

    const onAddMember = () => {
       memberStore.addMember();
    }

    const onUpdateMember = () => {
        memberStore.editMember();
    }

    const onDeleteMember = () => {
        memberStore.deleteMember();
    }

    return(
        <MemberEditformView
        member = {memberStore.getMember()}
        onSetMemberProps = {onSetMemberProps}
        onAddMember = {onAddMember}
        onUpdateMember = {onUpdateMember}
        onDeleteMember={onDeleteMember}
        />
    )
}));