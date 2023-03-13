
export function adminChecker () {
    let roleString : string='';
    localStorage.getItem('userRoles') ? roleString = localStorage.getItem('userRoles')! : roleString =''
    return roleString.includes('ADMIN');
}

export function TestBoardChecker(){
    let location : string = window.location.pathname
    console.log(location)
    return location.includes("test") ? true : false; 
}

export function getCurrentEmail(){
    const email = localStorage.getItem('clubRoles')?.match(/\/.+?"/)![0].slice(1, -1)!
    return email ? email : 'not logined';
}
