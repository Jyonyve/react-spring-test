import autobind from "autobind-decorator";
import axios from "axios";

const BASE_URL = 'http://localhost:8080/club';

@autobind
class ClubService {


    addClub(club){

        axios.post(
            BASE_URL,
            JSON.stringify(club),
            {headers: {
                "Content-Type" : `application/json`,
            },
        });
    }

    editClub(id, club){
        axios.put(
            BASE_URL + '/react/' + id,
            JSON.stringify(club),
            {
                headers: {
                    "Content-Type" : `application/json`,
                },        
            }
        );
    }

    deleteClub(id){
        axios.delete(BASE_URL+ '/' + id);
    }

    async fetchClubs(){
        let clubs = [];
        try {
          await axios.get(BASE_URL + '/all')
          .then(club => clubs.push(club.data))  
        } catch (error) {
            console.error(error.message);
        }
        return clubs;       
    }

    async fetchClubId(reactId){
        try{
        let id = await axios.get(BASE_URL + '/react/' + reactId);
        return id;
        }
        catch(error){
            console.error();
        }
    }
    
}

export default new ClubService();