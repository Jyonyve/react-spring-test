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

const ClubStore = types
.model('clubStore',{
    club : types.optional(club, defaultSnapshot),
    clubs: types.array(types.reference(club)),
    searchText : types.string
    }
)
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
        pushClubs.flat(Infinity).map( club => self.clubs.push(club));
    },

    async addIdToClub(){
        try{
        let insertClub = self.club;
        let id = await ClubService.addClub(insertClub);
        insertClub = {
            ...insertClub,
            'id' : id
        }
        console.log(JSON.stringify(insertClub))
        return insertClub;
        } catch(error){
            console.error(error);
        }
    },

    async addClub(){
        let insertClub = this.addIdToClub();
        self.clubs.push(insertClub);
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
    },
})))
export default ClubStore;