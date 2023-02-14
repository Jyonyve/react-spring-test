import { types } from 'mobx-state-tree';
const Address = types.model('Address', {
    zipCode : types.string,
    zipAddress :types.string,
    streetAddress : types.string,
    country : types.string,
    addressType: types.enumeration('AddressType', [
        'Home',
        'Office'
    ])
})
export default Address;