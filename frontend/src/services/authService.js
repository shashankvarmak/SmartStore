import axios from "axios";

const BASE_URL = "http://localhost:1111/api/auth";

export const login = (loginRequest) => {
    return axios.post(`${BASE_URL}/login`, loginRequest);
};

export const register = (registerRequest) => {
    return axios.post(`${BASE_URL}/register`, registerRequest);
};



