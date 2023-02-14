
export function adminChecker () {
    let roleString : string='';
    localStorage.getItem('userRoles') ? roleString = localStorage.getItem('userRoles')! : roleString =''
    return roleString.includes('ADMIN');
}

export function clubRoleChecker(clubId :string){
    const role = JSON.parse(localStorage.getItem('userRoles')!);
    return role[clubId];
}

export function getCurrentEmail(){
    const email = localStorage.getItem('clubRoles')?.match(/\/.+?"/)![0].slice(1, -1)!
    return email ? email : 'not logined';
}