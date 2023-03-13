import axios from "axios";
import { types } from "mobx-state-tree";

const BASE_URL: string = "/board"

const PostingService = types.model(
)
.actions(() => ({
    fetchPosting : async (postingId : string) => {
        let dbPosting : any; //배열타입 명시해주지 않으면 never라고 인식해서 초기화가 제대로 안됨
        try {
            await axios.get(
                BASE_URL + "/posting/" +postingId,
                {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                        },
                    withCredentials: true,
                })
            .then(posting => dbPosting = posting.data);
            return dbPosting;
        } catch (error) {
            console.error(error);
        }
    },

    addPosting : async (boardId:string, posting :any) => {
        try{
            let id:string = '';
            await axios.post(
                BASE_URL+"/"+boardId,
                JSON.stringify(posting),
                {
                    data : localStorage.getItem('userRoles'),
                    headers: {
                        "Content-Type" : `application/json`,
                        "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                    },
                    withCredentials: true,
                }).then( res => {id = res.data});
                return id;
        }catch(error){
            console.error(error);
        }
    },

    editPosting : async (targetPosting: any) => {
        try {
            if(!targetPosting){
                throw new Error('no member to for service!');
            }
            console.log(`posting edit`)
            axios.put(
                BASE_URL + "/" + targetPosting.id,
                JSON.stringify(targetPosting),
                {
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

    deletePosting : (id:string) => {
        console.log(`posting delete ID : ${id}`)
        axios.delete(BASE_URL + "/" + id,
        {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
            },
            withCredentials: true,
        }
        );
    },
}));
export default PostingService;
