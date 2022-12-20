import axios from "axios";
import  { useEffect } from "react";
import Member from "../aggregate/Member";

export const MemberService = (func: string, member : any) =>{
    
    const BASE_URL: string = 'http://localhost:8080/member';
    

    useEffect(() => {
        console.log(`memberService 호출`);
        memberService(func, member)
    })

    const addMember = async (targetMember: typeof Member) => {
        try{
            if(!targetMember){
                throw new Error('no member to for service!');
            }
           let id : string = '';
            await axios.post(
            BASE_URL,
            JSON.stringify(targetMember),
            {
                headers: {
                    "Content-Type" : `application/json`,
                }
            }
            ).then( res => {id = res.data});
            return id;

        } catch(error) {
            console.error(error);
        }
    }

    const editMember = async (targetMember:typeof Member) => {
        try {
            if(!targetMember){
                throw new Error('no member to for service!');
            }
            const id = targetMember.properties.id;
            axios.put(
                BASE_URL + `/react/${id}`,
                JSON.stringify(targetMember),{
                    headers:{
                        "Content-Type" : `application/json`,
                    }
                }
            )
        } catch (error) {
            console.error(error)
        }
    }

    const deleteMember = (targetMember : typeof Member) => {
        if(!targetMember){
            throw new Error('no member to for service!');
        }
        const id = targetMember.properties.id;
        axios.delete(BASE_URL + `/${id}`);
    }

    const fetchMembers =async () => {
        let members : any[] = []; //배열타입 명시해주지 않으면 never라고 인식해서 초기화가 제대로 안됨
        try {
            await axios.get(BASE_URL)
            .then(member => members.push(member.data));
            
            return members;
            
        } catch (error) {
            console.error(error);
        }
    }

    const memberService = (func:string, targetMember:typeof Member) => {

    switch(func){
        case 'addMember' :
            return addMember(targetMember);
        case 'editMember' :
            return editMember(targetMember);
        case 'deleteMember':
            return deleteMember(targetMember);
        case 'fetchMembers' :
            return fetchMembers();
        }  
    }

    return memberService;
}

