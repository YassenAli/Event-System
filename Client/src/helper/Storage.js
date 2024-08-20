import { jwtDecode } from "jwt-decode";

// COOKIES, LOCAL STORAGE
export const setAuthUser = (data) => {
    console.log("setAuth", data);
    // Storing the tokens and user data
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data));
};

export const getAuthUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
        try {
            const parsedUser = JSON.parse(user);
            console.log('Retrieved User:', parsedUser); // Check the user data
            return parsedUser;
        } catch (error) {
            console.error('Error parsing user data:', error);
            removeAuthUser(); // Remove corrupted data
        }
}};

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");

};

export const getEmail = () => {
    if(!getAccessToken()) return null;
    const decode = jwtDecode(getAccessToken());
    return decode.email;
}

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};


export const removeAuthUser = () =>{
    if(localStorage.getItem('user')) localStorage.removeItem('user');
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

