import {  castToSnapshot, types } from 'mobx-state-tree';
import Membership, { defaultSnapshotMembership } from '../aggregate/Membership';
import MembershipService from '../service/MemberShipService';


const MembershipStore = types
.model(('membershipStore'), {
    membership : types.optional(Membership, castToSnapshot(defaultSnapshotMembership)),
    memberships : types.array(Membership),
    membershipService : types.optional(MembershipService, {})
})
.views(self => ({
    getMembership(){
        const membership = {...self.membership}
        return membership;
    },
    getMemberships() {
        const memberships :any[] = {...self.memberships}
        return memberships;
    },
    getOneMembership(membershipId:string){
        const membership = self.memberships.filter( membership => membership.id === membershipId);
        return membership
    }
}))
.actions((self => ({
    setMembership (membership :any) {
        self.membership = castToSnapshot(membership);
    },

    setMembershipProps(name:string, value:string|number){
        self.membership = {
            ...self.membership,
            [name] : value
        }
    },

    setMemberships(dbMemberships:[]){
        dbMemberships.map(membership => self.memberships.push(membership))
    },

    addOneMembershipToMemberships(){
        self.memberships.push({...self.membership});
    },

    clearMembership() {
        self.membership = castToSnapshot(defaultSnapshotMembership);
    },

    clearMemberships(){
        self.memberships.clear();
    },

    // async fetchMemberships (clubId:string) {
    //     this.clearMemberships();
    //     // const dbMemberships: []|undefined = await self.membershipService.fetchMemberships(clubId)
    //     // this.setMemberships(dbMemberships!);
    //     return self.memberships
    // },
    
    // async setComments(dbComments:[]){
    //     dbComments!.forEach(comment => {
    //         self.comments.push(comment)
    //     });
    // },

    async addMembershipAndSetMembershipId(clubId:string) {
        let dbMembership : []|undefined =[];
        try{
            this.setMembershipProps('clubId', clubId);
            let targetMembership = self.getMembership()
            dbMembership = await self.membershipService.addMembership(targetMembership)
            this.setMembership(dbMembership);
            console.log(JSON.stringify(self.getMembership()))
        } catch(error){
            console.log(error);
        }
    },

   async fetchMembershipIdAndRole () {
    localStorage.removeItem('clubRoles')
    let infoMapString :string = '';
    let email : string = '';
    try{
        infoMapString = await self.membershipService.fetchMembershipRole();
        const clubRoles :string = `${JSON.stringify(infoMapString)}`;
        localStorage.setItem('clubRoles', clubRoles);
        email =localStorage.getItem('clubRoles')?.match(/\/.+?"/)![0].slice(1, -1)!
        return email;
    } catch(error){
        console.log(error);
    }
   },

})));
export default MembershipStore;