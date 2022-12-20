import { types } from 'mobx-state-tree';
const Address = types.model('Address', {
    zipCode : types.maybe(types.string),
    zipAddress :types.maybe(types.string),
    streetAddress : types.maybe(types.string),
    country : types.maybe(types.string),
    addressType: types.enumeration('AddressType', [
        'Home',
        'Office'
    ])
})
export default Address;