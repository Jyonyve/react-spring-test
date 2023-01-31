import axios from "axios";
import { types } from "mobx-state-tree";

const BASE_URL: string = '';

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
                data : localStorage.getItem('userRoles'),
                headers: {
                    "Content-Type" : `application/json`,
                    "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                },
                withCredentials: true,
            }
            ).then( res => {id = res.data});
            return id;

        } catch(error) {
            console.error(error);
        }
    },

    editMember : async (id:string, targetMember:any) => {
        try {
            if(!targetMember){
                throw new Error('no member to for service!');
            }
            axios.put(
                BASE_URL + "/" + id,
                JSON.stringify(targetMember),
                {
                    data : localStorage.getItem('userRoles'),
                    headers:{
                        "Content-Type" : `application/json`,
                        "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                    },withCredentials: true,
    
                }
            )
        } catch (error) {
            console.error(error)
        }
    },

    deleteMember : (id:string) => {
        axios.delete(BASE_URL + "/" + id,
        {
            data : localStorage.getItem('userRoles'),
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
            },
            withCredentials: true,
        }
        );
    },

    fetchMembers : async () => {
        let members : any[] = []; //배열타입 명시해주지 않으면 never라고 인식해서 초기화가 제대로 안됨
        try {
            await axios.get(
                BASE_URL,
                {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                        },
                    withCredentials: true,
                })
            .then(member => members.push(member.data));
            if(members !== undefined){
                // console.log(JSON.stringify(members));
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
