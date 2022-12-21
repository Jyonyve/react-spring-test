import {MemberService} from '../service/MemberService'
import { types } from 'mobx-state-tree';
import Member from '../aggregate/Member';

export const MemberStore = types.model('memberStore')
.props({
    member : types.reference(Member),
    members : types.array(Member),
    searchText : types.optional(types.string, '')
    
}).views(self => ({
        get member(){
            return self.member ? self.member : undefined;
        },

        get members(){
            return self.members ? self.members : [];
        },

        get searchText() {
            return self.searchText ? self.searchText : '';
        }
    }

)).actions((self => ({
        setMember : (member :any) => {
            self.member = member
        },

        setMemberProps : (name :string, value:string) => {
        self.member = {
            ...self.member,
            [name as keyof typeof Member] : value
            }
        },

        setMembers : async () => {
            self.members.clear();
            try {
                let dbMembers : any;
                dbMembers = MemberService('fetchMembers', self.member )
                await Promise.resolve(dbMembers).then(
                    dbMember => self.members.push(dbMember));
            } catch (error) {
                console.error(error);
            }
            return self.members
        },

        addMember : async () => {
            try {
                let id : any;
                await Promise.resolve(MemberService('addClub', self.member))
                .then(addId => id = addId);
                console.log(`new member id : ${id}`)
                self.member = {
                    ...self.member,
                    'id' : id
                }
                self.members.push(self.member)
    
            } catch (error) {
                console.error(error);
            }
        },

        editMember : () => {
            try {
                if(self.member){
                    const id : string|undefined = self.member?.id;
                    let i = self.members.findIndex(member => member.id === id);
                    self.members.splice(i, 1, self.member);
                    MemberService('editMember', self.member);
                }
                
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
                    MemberService('deleteMember', self.member);
                }
                
            } catch (error) {
                console.error(error);
            }

        }

    }
)));