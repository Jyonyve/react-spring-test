import axios from "axios";
import { types } from "mobx-state-tree";

const BASE_URL = '/club';

const ClubService = types.model()
.actions(() =>({

    async addClub (club) {
        try {
        let id = '';
        await axios.post(
            BASE_URL,
            JSON.stringify(club),
            {headers: {
                "Content-Type" : `application/json`,
                "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
            },
            withCredentials : true,
            }
            
        ).then( res => {id = res.data;});
        return id;
    }   catch(error){
        console.error(error);
    }

    },

    editClub (id, club) {
        axios.put(
            BASE_URL + '/' + id,
            JSON.stringify(club),
            {
                headers: {
                    "Content-Type" : `application/json`,
                    "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                },
                withCredentials : true,        
            }
        );
    },

    deleteClub(id) {
        axios.delete(BASE_URL+ '/' + id,
        {headers: {
            "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
            },
            withCredentials : true,
        }
        );
    },

    async fetchClubs () {
        let clubs = [];
        try {
          await axios.get(
                BASE_URL, 
                {headers: {
                "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                "Content-type": `application/json` ,
                },
                withCredentials: true,
                }
            )
            .then(club => clubs.push(club.data));
            return clubs;   
        } catch (error) {
            throw new Error(`fetchClub does not work.`)
        }
            
    }
}));
export default ClubService;