import Address from "./Address";
import { types } from "mobx-state-tree";
const Member = types.model('Member',
{
    email : types.maybe(types.string),
    name : types.maybe(types.string),
    phoneNumber :types.maybe(types.string),
    nickName : types.maybe(types.string),
    birthday: types.maybe(types.string),
    addresses : types.maybe(types.reference(Address)),
    id : types.maybe(types.identifier)
})

export default Member;