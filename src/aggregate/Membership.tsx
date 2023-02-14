import { types} from "mobx-state-tree";

// export const defaultSnapshotAddress = {
//     zipCode : '',
//     zipAddress :'',
//     streetAddress : '',
//     country : '',
//     addressType: '',
//     id : ''
// }
export const defaultSnapshotMembership = {
    id:'',
    clubId:'',
    memberId:'',
    nickname:'',
    email:'',
    password:'',
    joinDate : '',
    role: [],
    roleInClub:''
}

const Membership = types.model('Membership',
{
    id: types.string,
    clubId: types.string,
    memberId: types.string,
    nickname: types.optional(types.string,''),
    email: types.optional(types.string,''),
    password: types.optional(types.string,''),
    joinDate : types.optional(types.string,''),
    role: types.array(types.string),
    roleInClub:types.string,
})
export default Membership;
