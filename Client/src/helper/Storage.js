//COOKIES, LOCAL STORAGE
export const setAuthUser = (data) =>{
    // save object to the local storage
    //stringify boject ot text
    console.log("setAuth", data);
    // localStorage.setItem("user", JSON.stringify(data))
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data));
}

export const getAuthUser = (data) =>{
    // get object from the local storage
    //parse boject ot text
    if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'));
    }
}

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
}

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
}


export const removeAuthUser = () =>{
    if(localStorage.getItem('user')) localStorage.removeItem('user');
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}
