import axios from "axios";

import { getToken } from "../utils/tokenStorage";

const BASE_URL = "http://localhost:1111/api/dashboard";

const getAuthHeader = () => ({

    headers: {

        Authorization: `Bearer ${getToken()}`

    }

});

export const getDashboard = () => {

    return axios.get(

        BASE_URL,

        getAuthHeader()

    );

};