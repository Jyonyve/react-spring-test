
export function adminChecker (roleString : string) {
    return roleString === 'ROLE_ADMIN'? true : false;
}