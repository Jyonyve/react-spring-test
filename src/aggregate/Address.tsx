import AddressType from './AddressType'
interface Address {
    zipCode : string;
    zipAddress :string;
    streetAddress : string;
    country : string;
    addressType: AddressType;
}
export default Address;