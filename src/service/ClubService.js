import autobind from "autobind-decorator";
import axios from "axios";

@autobind
class ClubService {
    
    BASE_URL = '/club';

    async addClub(club){

        let id = '';
        await axios.post(
            this.BASE_URL,
            JSON.stringify(club),
            {headers: {
                "Content-Type" : `application/json`,
                "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
            },
        }).then( res => {id = res.data;});
        return id;

    }

    editClub(id, club){
        axios.put(
            this.BASE_URL + '/' + id,
            JSON.stringify(club),
            {
                headers: {
                    "Content-Type" : `application/json`,
                    "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                },        
            }
        );
    }

    deleteClub(id){
        axios.delete(this.BASE_URL+ '/' + id,
        {headers: {
            "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
            },
        }
        );
    }

    async fetchClubs(){
        let clubs = [];
        try {
          await axios.get(
          this.BASE_URL, 
                {headers: {
                "Authorization" : `Bearer ${localStorage.getItem('id_token')}`,
                "Content-type": `application/json` 
                },
                }
            )
            .then(club => clubs.push(club.data));
          console.log(clubs)
        } catch (error) {
            console.error(error.message);
        }
        return clubs;       
    }
}
// eslint-disable-next-line
export default new ClubService();