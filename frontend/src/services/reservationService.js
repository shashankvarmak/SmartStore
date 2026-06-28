import axios from "axios";

import { getToken } from "../utils/tokenStorage";

const BASE_URL = "http://localhost:1111/api/reservations";

const getAuthHeader = () => {

    return {

        headers: {

            Authorization: `Bearer ${getToken()}`

        }

    };

};

export const createReservation = () => {

    return axios.post(

        BASE_URL,

        {},

        getAuthHeader()

    );

};

export const getMyReservations = () => {

    return axios.get(

        BASE_URL,

        getAuthHeader()

    );

};