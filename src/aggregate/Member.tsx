import {  types} from "mobx-state-tree";

export const defaultSnapshotAddress = {
    zipCode : '',
    zipAddress :'',
    streetAddress : '',
    country : '',
    addressType: 'Home',
    id : ''
}
export const defaultSnapshotMember = {
    id:'',
    name:'',
    email:'',
    phoneNumber:'',
    nickName : '',
    birthday: '',
    addresses : defaultSnapshotAddress

}

const Member = types.model('Member',
{
    email : types.string,
    name :types.string,
    phoneNumber :types.string,
    nickName : types.string,
    birthday: types.string,
    addresses : types.map(types.string),
    id : types.identifier
})
export default Member;
