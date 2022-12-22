import ClubService from '../service/ClubService';
import {  castToReferenceSnapshot, types } from 'mobx-state-tree';

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
    clubs: types.array(club),
    searchText : types.string
    }
)
.actions((self => ({

    setClub(club){
        self.club = {...club};  
    },

    clearClub: () => {
        self.club = defaultSnapshot;
        console.log('club cleaning' + JSON.stringify(self.club));
    },
    
    clearClubs : () => {
        self.clubs.clear();
    },

    setClubProps: (name , value) => {
        self.club = {
            ...self.club,
            [name] : value
        }
    },

    setSearchText(searchText){
        self.searchText = searchText;
    },

    pushClubs : (clubs) => {
        let clubList = JSON.parse(clubs);
        clubList.map(club => self.clubs.push(castToReferenceSnapshot(club)));
    },

    async fetchClubs(){
        try {
            this.clearClubs();
            let dbClubs = [];
            dbClubs = await ClubService.fetchClubs();
            return dbClubs;
        } catch (error) {
            console.error(error);
        }
    },

    async setClubs(){
        let dbClubs = await this.fetchClubs();
        dbClubs = dbClubs.flat(Infinity);
        console.log(dbClubs)
        this.pushClubs(JSON.stringify(dbClubs))
    },

    async  addIdToClub(){
        try{
        let insertClub = {};
        insertClub = {...self.club};
        let id = await ClubService.addClub(insertClub)
        insertClub = {
            ...insertClub,
            'id' : id
        }
        console.log(JSON.stringify(insertClub) + '    1')
        this.setClubProps('id', id);
        console.log('2')
        } catch(error){
            console.error(error);
        }
    },

    async addClub(){
        await this.addIdToClub();
        console.log('3')
        this.setClubs();
        console.log('4')
    },


    updateClub(){
        try {
        let i = self.clubs.findIndex(club => club.id === self.club.id);
        self.clubs.splice(i, 1, {...self.club});
        console.log(`club ID : ${self.club.id}`)
        ClubService.editClub(self.club.id, self.club);
        }catch(error){
            console.error(error);
        }

        
    },

    filterClub(){
        return self.clubs.filter( club => club.name.match(self.searchText));
    },

    deleteClub(){
        try{
            let i = self.clubs.findIndex(club => club.id === self.club.id);
            self.clubs.splice(i, 1);
            ClubService.deleteClub(self.club.id);
        }
        catch (error) {
            console.error(error);
        }
    },
})))
export default ClubStore;