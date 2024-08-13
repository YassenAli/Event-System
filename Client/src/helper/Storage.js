//COOKIES, LOCAL STORAGE
export const setAuthUser = (data) =>{
    // save object to the local storage
    //stringify boject ot text
    localStorage.setItem("user", JSON.stringify(data))
    localStorage.setItem('token', JSON.stringify(data).token);
}

export const getAuthUser = (data) =>{
    // get object from the local storage
    //parse boject ot text
    if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user')).is_admin;
    }
}

export const removeAuthUser = () =>{
    if(localStorage.getItem('user')) localStorage.removeItem('user');
}