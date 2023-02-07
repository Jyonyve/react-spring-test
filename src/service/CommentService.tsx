import axios from "axios";
import { types } from "mobx-state-tree";

const BASE_URL: string = '/board/posting';

const CommentService = types.model(
)
.actions(() => ({
    // 

    fetchComments :async (postingId:string) => {
        let comments : [] = [];
        try{
            await axios.get(
                BASE_URL + "/" + postingId +"/all",
                {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                        },
                    withCredentials: true,
                }
            )
            .then( (dbComments => comments =dbComments.data)
            )
            return comments;
        }catch(error){
            console.error(`fetchBoard: one board fetchs error.`)
        }
    },

    addComment :async(frontComment: any) =>{
        let comment :[] = []
        try{
            await axios.post(
                `${BASE_URL}/comment`,
                JSON.stringify(frontComment),
                {
                    headers: {
                        "Content-Type" : `application/json`,
                        "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                    },
                    withCredentials: true,
                }
            ).then(commentInfo => comment = commentInfo.data);
            return comment;
        }catch(error){
            console.error(error)
        }
    },

    editComment : async (targetComment:any) => {
        try {
            if(!targetComment){
                throw new Error('no member to for service!');
            }
            axios.put(
                BASE_URL + "/" + targetComment.id,
                JSON.stringify(targetComment),
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

    deleteComment : (id:string) => {
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
export default CommentService;