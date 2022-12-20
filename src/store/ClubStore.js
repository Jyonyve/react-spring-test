import ClubService from '../service/ClubService';
import { types } from 'mobx-state-tree';

export const club = types.model({
    id : types.identifier,
    name : types.string,
    intro : types.string,
    foundationTime : types.number
})

const ClubStore = types.model('clubStore')
.props({
    club : types.map(club),
    clubs: types.array(club),
    searchText : types.string
})
.views(self => ({
    get club(){
        return self.club ? self.club : undefined;
    },

    get clubs(){
        return self.clubs ? self.clubs : [];
    },

    get searchText() {
            return self.searchText ? self.searchText : '';
        }
}))
.actions((self => ({
    setClub : (club) => {
        self.club = club;
    },

    setClubProps: (name , value) => {
        self.club = {
            ...self.club,
            [name] : value
        }
    },

    async setClubs(){
        self.clubs.clear();
        try {
            let dbClubs = [];
            dbClubs = ClubService.fetchClubs();
            await Promise.resolve(dbClubs)
            .then(dbClub => self.clubs.push(dbClub));
        } catch (error) {
            console.error(error);
        }
    },

    async addClub(){
        try{
        let id ='';
        id = await this.clubService.addClub(club);
        self.setClubProps('id', id)
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

    filterClub(){
        self.clubs.filter( club => club.name.match(self.searchText));
    },

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