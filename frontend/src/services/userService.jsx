import axios from "axios";

import { getToken } from "../utils/tokenStorage";

const BASE_URL = "http://localhost:1111/api/auth";

const getAuthHeader = () => {

    return {

        headers: {

            Authorization: `Bearer ${getToken()}`

        }

    };

};

export const getProfile = () => {

    return axios.get(

        `${BASE_URL}/profile`,

        getAuthHeader()

    );

};