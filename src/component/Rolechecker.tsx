
export function adminChecker () {
    let roleString : string='';
    localStorage.getItem('userRoles') ? roleString = localStorage.getItem('userRoles')! : roleString =''
    return roleString.includes('ADMIN');
}

export function clubRoleChecker(clubId :string){
    const role = JSON.parse(localStorage.getItem('userRoles')!);
    return role[clubId];
}