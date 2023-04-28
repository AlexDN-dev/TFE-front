export function hasToken(){
    return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
}

export function getToken(){
    let token = window.sessionStorage.getItem('token')
    if(token === null){
        token = window.localStorage.getItem('token')
    }
    return token
}

export function logout() {
    window.sessionStorage.removeItem('token')
    window.localStorage.removeItem('token')
}