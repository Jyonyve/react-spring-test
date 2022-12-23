import MemberService from '../service/MemberService';
import { castToReferenceSnapshot, castToSnapshot, types } from 'mobx-state-tree';
import Member, { defaultSnapshotMember } from '../aggregate/Member';


export const MemberStore = types
.model(('memberStore'), {
    member : types.optional(Member, defaultSnapshotMember),
    members : types.array(Member),
    searchText : types.optional(types.string, ''),
    memberService : types.optional(MemberService, {})
})
.views(self => ({
    getMember : () => {
        const member = {...self.member}
        return member;
    },

    getMembers: () => {
        const members = {...self.members}
        return members;
    },

    getSearchText: () => {
        return self.searchText;
    },
}))
.actions((self => ({

    setMember (member :any) {
        self.member = {...member}
    },

    setMemberAddressKey (name: string, value : string){
        self.member.addresses = {
            ...self.member.addresses,
            [name] : value
        }
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
           let dbMembers = await this.fetchMembers();
            dbMembers = dbMembers.flat(Infinity);
            console.log(dbMembers);
            this.pushMembers(JSON.stringify(dbMembers)); 
        } catch (error) {
            
        }
    },

    pushMembers : (JSONmembers: string) => {
        let memberList :[] = JSON.parse(JSONmembers);
        memberList.map(member => self.members.push(castToReferenceSnapshot(member)));
    },

   async addIdToMember(){
        try {
            let insertMember = {...self.member};
            let id : any = await self.memberService.addMember(insertMember);
            let insertId :string = id as string
            insertMember = {
                ...insertMember, 
                'id' : insertId
            };
            console.log(`id: ${insertId}`)
            this.setMemberProps('id', insertId);
            //this.setMember(castToSnapshot(insertMember));
        } catch (error) {
            console.log(error);
        }    
   },

    async addMember(){
        try {
            console.log(`addMember ran.`)
            await this.addIdToMember();
            console.log(`addIdMember ran.`)
            this.setMembers();
            console.log(`setMembers ran.`)
        } catch (error) {
            console.error(error);
        }
    },

    editMember () {
        try {
            const id : string|undefined = self.member?.id;
            let memberList = self.getMembers();
            let i = self.members.findIndex(member => member.id === id);
            memberList.splice(i, 1, self.member);
            
            self.memberService.editMember(self.getMember);

            
        } catch (error) {
            console.error(error);
        }
    },

    deleteMember : () => {
        try {
            if(self.member){
                const id :string|undefined = self.member?.id;
                let i = self.members.findIndex(member => member.id === id);
                self.members.splice(i, 1);    
                self.memberService.deleteMember(id);
            }
            
        } catch (error) {
            console.error(error);
        }

    }

}
)));