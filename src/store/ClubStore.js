import ClubService from '../service/ClubService';
import { types } from 'mobx-state-tree';

export const club = types.model({
    id : types.identifier,
    name : types.string,
    intro : types.string,
    foundationTime : types.number
});

export const defaultSnapshot = {
        id:'',
        name:'',
        intro:'',
        foundationTime:0,
}

const ClubStore = types.model('clubStore',{
    club : types.optional(club, defaultSnapshot),
    clubs: types.array(club),
    searchText : types.string
    }
)
// .props({
    
// })
// .views(self => ({
    // get club(){
    //     return self.club;
    // },

    // get clubs(){
    //     return self.clubs ? self.clubs : [];
    // },

    // get searchText() {
    //         return self.searchText ? self.searchText : '';
    //     }
//}))
.actions((self => ({
    setClub : (club) => {
        self.club = club;
    },

    clearClub : () => {
        self.clubs.clear();
    },

    setClubProps: (name , value) => {
        self.club = {
            ...self.club,
            [name] : value
        }
    },

    async fetchClubs(){
        try {
            this.clearClub();
            let dbClubs = [];
            dbClubs = await ClubService.fetchClubs();
            return dbClubs;
        } catch (error) {
            console.error(error);
        }
    },

    setClubs(){
        let pushClubs = [];
        let dbClubs = this.fetchClubs();
        Promise.resolve(dbClubs)
        .then(dbClub => pushClubs.push(dbClub))
        self.clubs = pushClubs.flat(Infinity)
    },

    async addClub(){
        try{
        let id ='';
        id = await this.clubService.addClub(club);
        this.setClubProps('id', id)
        console.log(JSON.stringify(self.club))
        self.clubs.push(self.club);
        } catch(error){
            console.error(error);
        }
    },

    updateClub(){
        try {
        let i = self.clubs.findIndex(club => club.id === self.club.get('id').id);
        self.clubs.splice(i, 1, self.club);
        console.log(`club ID : ${self.club.get('id').id}`)
        ClubService.editClub(self.club.get('id').id, self.club);
        }catch(error){
            console.error(error);
        }

        
    },

    // filterClub(){
    //     return self.clubs.filter( club => club.name.match(self.searchText));
    // },

    deleteClub(){
        try{
            let i = self.clubs.findIndex(club => club.id === self.club.get('id').id);
            self.clubs.splice(i, 1);

            ClubService.deleteClub(self.club.get('id').id);
        }
        catch (error) {
            console.error(error);
        }
    }

})))
export default ClubStore;