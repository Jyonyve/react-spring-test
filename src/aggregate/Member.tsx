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
    nickName : '',
    birthday: '',
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
    phoneNumber :types.optional(types.string,''),
    nickName : types.optional(types.string,''),
    birthday: types.optional(types.string,''),
    id : types.identifier,
    //address : types.reference(castToSnapshot(Address))
})
export default Member;
