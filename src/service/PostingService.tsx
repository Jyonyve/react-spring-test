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
                BASE_URL+"/"+postingId,
                {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                        },
                    withCredentials: true,
                })
            .then(posting => dbPosting = posting);
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

}));
export default PostingService;
