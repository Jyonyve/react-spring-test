import Member from '../aggregate/Member'
import {useEffect, useState} from 'react'; 
import {MemberService} from '../service/MemberService'

export const MemberStore = () => {

    const [member, setMember] = useState<Member|undefined>(undefined);
    const [members, setMembers] = useState<Member[]>([]);
    const [searchText, setSearchText] = useState('');
    
    const fetchMembers = async () => {
        try {
            
            let dbMembers : any;
            dbMembers = MemberService('fetchMembers', member)
            await Promise.resolve(dbMembers).then(
                dbMember => members.push(dbMember));
            setMembers(members);
        } catch (error) {
            console.error(error);
        }
        return members;
    }

    const addMember = async (member: Member) => {
        try {
            let id : any;
            await Promise.resolve(MemberService('addClub', member))
            .then(addId => id = addId);
            console.log(`new member id : ${id}`)

            member = {...member, 'id':id}
            setMember(member);
            members.push(member);
            setMembers(members);

        } catch (error) {
            console.error(error);
        }
        setMember(undefined);
    }

    const editMember = () => {
        try {
            if(member){
                const id : string = member.id;
                let i = members.findIndex(member => member.id === id)
                let newMembers : Member[] = members;
                newMembers.fill(member, i, i+1);
                setMembers(newMembers);

                MemberService('editMember', member);
            }
            
        } catch (error) {
            console.error(error);
        }
        setMember(undefined);
    }

    const deleteMember = () => {
        try {
            if(member){
                const id :string = member.id;
                let i = members.findIndex(member => member.id === id);
                let memberDeleted : Member[] = members.splice(i, 1);
                setMembers(memberDeleted);

                MemberService('deleteMember', member);
                setMember(undefined);
            }
            
        } catch (error) {
            console.error(error);
        }
    }

}