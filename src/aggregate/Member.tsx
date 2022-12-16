import Address from "./Address";
interface Member {
    email : string;
    name : string;
    phoneNumber :string;
    nickName : string;
    birthday: string;
    addresses : Address;
    id : string;
}
export default Member;