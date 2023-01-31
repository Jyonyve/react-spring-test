import { dateTimePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";

export function adminChecker (roleString : string) {
    return roleString === 'ROLE_ADMIN'? true : false;
}