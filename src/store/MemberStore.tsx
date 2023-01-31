import MemberService from '../service/MemberService';
import {  castToSnapshot, types } from 'mobx-state-tree';
import Member, { defaultSnapshotMember, disguidedSnapshotMember } from '../aggregate/Member';

export const MemberStore = types
.model(('memberStore'), {
    member : types.optional(Member, defaultSnapshotMember),
    members : types.array(Member),
    searchText : types.string,
    memberService : types.optional(MemberService, {})
})
.views(self => ({
    getMember(){
        const member = {...self.member}
        return member;
    },

    getMembers() {
        const members = {...self.members}
        return members;
    },

    getSearchText(){
        return self.searchText;
    },
}))
.actions((self => ({

    setMember (member :any) {
        self.member = {...member}
    },

    setMemberProps (name :string, value:string) {
    self.member = {
        ...self.member,
        [name] : value
        }
    },

    clearMember() {
        self.member = castToSnapshot(defaultSnapshotMember);
    },

    clearMembers() {
        self.members.clear();
    },

    async fetchMembers() {
        try {
            this.clearMembers();
            let dbMembers : any;
            dbMembers = await self.memberService.fetchMembers();
            return dbMembers;
        } catch (error) {
            console.error(error);
        }
    },

    async setMembers() {
        try {
           let dbMembers :any[] = await this.fetchMembers();
                dbMembers = dbMembers.flat(Infinity);
                this.pushMembers(JSON.stringify(dbMembers)); 
        } catch (error) {
            console.error(error)
        }
    },

    pushMembers : (JSONmembers: string) => {
        let memberList :any[] = JSON.parse(JSONmembers);
        if (memberList.length <= 1){
            self.members.push(disguidedSnapshotMember)
        }
        memberList.map(member => self.members.push(castToSnapshot(member)))
    },

   async addIdToMember(){
        try {
            let insertMember = {...self.member};
            let id : string|undefined = await self.memberService.addMember(insertMember);
            console.log(`id: ${id}`)
            this.setMemberProps('id', id!)
        } catch (error) {
            console.log(error);
        }    
   },

    async addMember(){
        try {
            console.log(`addMember ran.`)
            await this.addIdToMember();
            console.log(`addIdMember ran.`)
            console.log(`${JSON.stringify({...self.member})}`)
            this.setMembers();
            console.log(`setMembers ran.`)
        } catch (error) {
            console.error(error);
        }
    },

    editMember () {
        try {
            const targetMember = {...self.member}
            console.log(`editTargetMember : ${JSON.stringify(targetMember)}`)
            const id : string = self.member.id;
            let i = self.members.findIndex(member => member.id === id);
            self.memberService.editMember(id, targetMember);
            self.members.splice(i, 1, targetMember);
        } catch (error) {
            console.error(error);
        }
    },

    deleteMember : () => {
        try {
                const id :string = self.member.id;
                console.log(id)
                let i = self.members.findIndex(member => member.id === id);
                self.members.splice(i, 1);    
                self.memberService.deleteMember(id); 
        } catch (error) {
            console.error(error);
        }

    }

}
)));