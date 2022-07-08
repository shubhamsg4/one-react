import decode from "jwt-decode";

const loggedIn = () => {
    if (localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
};


const getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem("token");
};

const setToken = (token) => {
    localStorage.setItem("token", token);
}

const logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("token");
};

const getProfile = () => {
    // Using jwt-decode npm package to decode the token
    return decode(getToken());
};
const getRole = id => {
    const data = {
        1: "Super Admin",
        2: "Admin",
        3: "Head Coach",
        4: "Sales POC",
        5: "KAM"
    };
    // Using jwt-decode npm package to decode the token
    return data[id];
};

export { getToken, setToken, getProfile, loggedIn, logout, getRole };