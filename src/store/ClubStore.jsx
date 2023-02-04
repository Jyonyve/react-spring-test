import { club, defaultSnapshot } from '../aggregate/Club';
import { types, castToSnapshot } from 'mobx-state-tree';
import ClubService from '../service/ClubService';

const ClubStore = types
.model(('clubStore'),{
    club : types.optional(club, defaultSnapshot),
    clubs: types.array(club),
    searchText : types.string,
    clubService : types.optional(ClubService, {})
    })
.views( self => ({
    getClub(){
        const club = {...self.club}
        return club;
    },

    getClubs(){
        const clubs = {...self.clubs}
        return clubs;
    },
}))
.actions((self => ({

    setClub(club){
        self.club = {...club};  
    },

    clearClub: () => {
        self.club = defaultSnapshot;
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

    pushClubs (JSonclubs) {
        console.log(JSonclubs)
        let clubList = JSON.parse(JSonclubs);
        clubList.map(club => self.clubs.push(castToSnapshot(club)));
    },

    async fetchClubs(){
        try {
            this.clearClubs();
            let dbClubs = [];
            dbClubs = await self.clubService.fetchClubs();
            return dbClubs;
        } catch (error) {
            console.error(error);
        }
    },

    async setClubs(){
        let dbClubs = await this.fetchClubs();
        if(dbClubs && Array.isArray(dbClubs)){
            dbClubs = dbClubs.flat(Infinity);
        }
        this.pushClubs(JSON.stringify(dbClubs))
    },

    async  addIdToClub(){
        try{
        let insertClub = {};
        insertClub = {...self.club};
        let id = await self.clubService.addClub(insertClub)
        insertClub = {
            ...insertClub,
            'id' : id
        }
        this.setClubProps('id', id);
        } catch(error){
            console.error(error);
        }
    },

    async addClub(){
        await this.addIdToClub();
        this.setClubs();
    },


    updateClub(){
        try {
        let i = self.clubs.findIndex(club => club.id === self.club.id);
        self.clubs.splice(i, 1, {...self.club});
        console.log(`club ID : ${self.club.id}`)
        self.clubService.editClub(self.club.id, self.club);
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
            self.clubService.deleteClub(self.club.id);
        }
        catch (error) {
            console.error(error);
        }
    },
})))
export default ClubStore;