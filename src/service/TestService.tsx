import axios from "axios";
import { types } from "mobx-state-tree";
import { BoardKind } from "../aggregate/BoardKind";

const BASE_URL: string = "/test"

const TestService = types.model(
)
.actions(() => ({

    addSampleBoard :async (boardKind: string) => {
        try{
            await axios.post(
                BASE_URL +"/"+ boardKind,
            ).then();
        } catch(error){
            console.error(error);
        }
    },
    
    addPosting : async (boardId:string, posting :any) => {
        try{
            let id: string = '';
            await axios.post(
                BASE_URL + "/" + boardId + "/posting",
                JSON.stringify(posting),
                {headers: {
                    "Content-Type" : `application/json`,
                }},
                )
                .then( res => {id = res.data});
                console.log(posting);
                return id;
        }catch(error){
            console.error(error);
        }
    },

    editPosting : async (targetPosting: any) => {
        try {
            if(!targetPosting){
                throw new Error('testService: no target posting');
            }
            axios.put(
                BASE_URL + "/" + targetPosting.id,
                JSON.stringify(targetPosting),
                {
                    headers:{
                        "Content-Type" : `application/json`,
                    }
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

    fetchSamplePostings :async (boardKind:BoardKind) => {
        let samplePostings : any;
        try{
            await axios.get(
                BASE_URL + "/" + boardKind,
                {}
            )
            .then(
                fetchPostings => samplePostings = fetchPostings.data   
            )
        }catch(error){
            console.error(`fetchBoard: one board fetchs error.`)
        }
        
        return samplePostings;
    },

    fetchSamplePosting : async (postingId : string) => {
        let samplePosting : any;
        try{
            await axios.get(
                BASE_URL+ "/" + postingId,
                {
                    headers:{
                        "Content-Type" : `application/json`,
                    }
                }
            ).then(
                fetchPosting => samplePosting = fetchPosting.data
            )
        } catch (error){
            console.error(`fetchBoard: one board fetchs error.`)
        }
        return samplePosting;
    },

    fetchSampleComments : async(postingId: string) => {
        let sampleComments : any;
        try{
            await axios.get(
                BASE_URL + "/" + postingId + "/all",
                {}
            )
            .then(
                fetchComments => sampleComments = fetchComments.data   
            )
        }catch(error){
            console.error(`fetchBoard: one board fetchs error.`)
        }
        
        return sampleComments;
    },

    addComment :async(postingId: string, targetComment: any) =>{
        let comment : any;
        console.log(targetComment)
        try{
            await axios.post(
                BASE_URL + "/" + postingId + "/comment",
                JSON.stringify(targetComment),
                {
                    headers: {
                        "Content-Type" : `application/json`,
                    },
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
                throw new Error('no target comment to edit!');
            }
            axios.put(
                BASE_URL + "/" + targetComment.id,
                JSON.stringify(targetComment),
                {
                    headers:{
                        "Content-Type" : `application/json`,
                    }
    
                }
            )
        } catch (error) {
            console.error(error)
        }
    },

    deleteComment : (id:string) => {
        console.log(`comment delete ID : ${id}`)
        axios.delete(
            BASE_URL + "/" + id,
        {
            headers: {
                "Content-Type" : `application/json`,
            },
        }
        );
    },
}));
export default TestService;
