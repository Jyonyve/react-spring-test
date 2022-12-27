import { observer } from "mobx-react";
import React,{useState, useEffect} from "react";
import Member from "../aggregate/Member";
import { useStore } from "../store/RootStore";
import { MemberListView } from "../views/MemberListView";

export const MemberListContainer = (observer(() => {
    
    const memberStore = useStore().memberStore;
    let [copyMembers, setCopyMembers] = useState<any[]>();

    useEffect(()=>{setUpList()})

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

    async function setUpList(){
            let dbMembers = await memberStore.fetchMembers()
            setCopyMembers(dbMembers.flat(Infinity));
    }

    let members = copyMembers?.filter(member => member.email.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

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