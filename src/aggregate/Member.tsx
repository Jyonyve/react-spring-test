import { types} from "mobx-state-tree";

// export const defaultSnapshotAddress = {
//     zipCode : '',
//     zipAddress :'',
//     streetAddress : '',
//     country : '',
//     addressType: '',
//     id : ''
// }
export const defaultSnapshotMember = {
    id:'',
    name:'',
    email:'',
    phoneNumber:'',
    nickName : 'Top Secret',
    birthday: 'Top Secret',
    password: 'Top Secret',
    role: [],
    provider: 'Top Secret',
    //address : defaultSnapshotAddress

}

// const Address = types.model('Address',{
//     zipCode : types.string,
//     zipAddress :types.string,
//     streetAddress : types.string,
//     country : types.string,
//     addressType: types.string,
//     id : types.string
// })

const Member = types.model('Member',
{
    email : types.optional(types.string,''),
    name :types.optional(types.string,''),
    phoneNumber :types.optional(types.string,'000-111-2222'),
    nickName : types.optional(types.string,'default'),
    birthday: types.optional(types.string,'default'),
    id : types.identifier,
    role : types.array(types.string),
    password: types.optional(types.string,'000000'),
    provider: types.optional(types.string,''),
    //address : types.reference(castToSnapshot(Address))
})
export default Member;
