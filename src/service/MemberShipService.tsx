import axios from "axios";
import { types } from "mobx-state-tree";

const BASE_URL: string = '/membership';

const MembershipService = types.model(
)
.actions(() => ({

    addMembership : async (targetMembership : any) => {
        try{
            if(!targetMembership){
                throw new Error('no member to for service!');
            }
            let dbMembership : [] =[];
            await axios.post(
            BASE_URL + "/" + targetMembership.clubId,
            JSON.stringify(targetMembership),
            {
                headers: {
                    "Content-Type" : `application/json`,
                    "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                },
                withCredentials: true,
            }
            ).then( res => {dbMembership = res.data});
            return dbMembership;

        } catch(error) {
            console.error(error);
        }
    },

    fetchMembershipRole :async () => {
        try{
            let infoMap :any;
            await axios.get(
            BASE_URL,
            {
                headers: {
                    "Content-Type" : `application/json`,
                    "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                },
                withCredentials: true,
            }
            ).then( res => {infoMap = res.data});
            return infoMap;

        } catch(error) {
            console.error(error);
        }
    },

    // editMember : async (id:string, targetMember:any) => {
    //     try {
    //         if(!targetMember){
    //             throw new Error('no member to for service!');
    //         }
    //         axios.put(
    //             BASE_URL + "/" + id,
    //             JSON.stringify(targetMember),
    //             {
    //                 data : localStorage.getItem('userRoles'),
    //                 headers:{
    //                     "Content-Type" : `application/json`,
    //                     "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
    //                 },withCredentials: true,
    
    //             }
    //         )
    //     } catch (error) {
    //         console.error(error)
    //     }
    // },

    // deleteMember : (id:string) => {
    //     axios.delete(BASE_URL + "/" + id,
    //     {
    //         data : localStorage.getItem('userRoles'),
    //         headers: {
    //             "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
    //         },
    //         withCredentials: true,
    //     }
    //     );
    // },

    // fetchMembers : async () => {
    //     let members : any[] = []; //배열타입 명시해주지 않으면 never라고 인식해서 초기화가 제대로 안됨
    //     try {
    //         await axios.get(
    //             BASE_URL,
    //             {
    //                 headers: {
    //                     "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
    //                     },
    //                 withCredentials: true,
    //             })
    //         .then(member => members.push(member.data));
    //         if(members !== undefined){
    //             // console.log(JSON.stringify(members));
    //             return members;
    //         }else {
    //             throw new Error(`fetchMember Cannot be undefined.`)
    //         }
            
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
}));
export default MembershipService;
