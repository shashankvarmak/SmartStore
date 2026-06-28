import axios from "axios";

import { getToken } from "../utils/tokenStorage";

const BASE_URL = "http://localhost:1111/api/cart";

const getAuthHeader = () => {

    return {

        headers: {

            Authorization: `Bearer ${getToken()}`

        }

    };

};

export const addToCart = (request) => {

    return axios.post(

        `${BASE_URL}/add`,

        request,

        getAuthHeader()

    );

};

export const getCart = () => {

    return axios.get(

        BASE_URL,

        getAuthHeader()

    );

};

export const updateCartItem = (cartItemId, quantity) => {

    const config = getAuthHeader();

    console.log("PUT Headers :", config);

    console.log("PUT Body :", {
        quantity
    });

    return axios.put(

        `${BASE_URL}/items/${cartItemId}`,

        {
            quantity
        },

        config

    );

};

export const clearCart = () => {

    const config = getAuthHeader();

    console.log("DELETE Headers :", config);

    return axios.delete(

        `${BASE_URL}/clear`,

        config

    );

};