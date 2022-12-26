import axios from "axios";
import { types } from "mobx-state-tree";

const BASE_URL: string = 'http://localhost:8080/member';

const MemberService = types.model(
)
.actions(() => ({

    addMember : async (targetMember : any) => {
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
    },

    editMember : async (targetMember: any) => {
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
    },

    deleteMember : (targetMember :any) => {
        if(!targetMember){
            throw new Error('no member to for service!');
        }
        const id = targetMember.properties.id;
        axios.delete(BASE_URL + `/${id}`);
    },

    fetchMembers : async () => {
        let members : any[] = []; //배열타입 명시해주지 않으면 never라고 인식해서 초기화가 제대로 안됨
        try {
            await axios.get(BASE_URL)
            .then(member => members.push(member.data));
            if(members !==undefined){
                return members;
            }else {
                throw new Error(`fetchMember Cannot be undefined.`)
            }
            
        } catch (error) {
            console.error(error);
        }
    }
}));
export default MemberService;
