import {  types} from "mobx-state-tree";

export const defaultSnapshotAddress = {
    zipCode : '',
    zipAddress :'',
    streetAddress : '',
    country : '',
    addressType: 'Home',
    addressId : '',
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

const Address = types.model('Address',{
    zipCode : types.string,
    zipAddress :types.string,
    streetAddress : types.string,
    country : types.string,
    addressType: types.string,
    addressId : types.string,
    id : types.string
})

const Member = types.model('Member',
{
    email : types.string,
    name :types.string,
    phoneNumber :types.string,
    nickName : types.string,
    birthday: types.string,
    addresses : types.map(types.reference(Address)),
    id : types.identifier
})
export default Member;
