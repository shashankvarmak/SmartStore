import axios from "axios";

import { getToken } from "../utils/tokenStorage";

const BASE_URL = "http://localhost:1111/api/products";

const getAuthHeader = () => ({

    headers: {

        Authorization: `Bearer ${getToken()}`

    }

});

export const getProducts = (

    page = 0,

    size = 10

) => {

    return axios.get(

        BASE_URL,

        {

            ...getAuthHeader(),

            params: {

                page,

                size

            }

        }

    );

};

export const createProduct = request =>

    axios.post(

        BASE_URL,

        request,

        getAuthHeader()

    );

export const updateProduct = (id, request) =>

    axios.put(

        `${BASE_URL}/${id}`,

        request,

        getAuthHeader()

    );

export const deleteProduct = id =>

    axios.delete(

        `${BASE_URL}/${id}`,

        getAuthHeader()

    );

export const addStock = (id, quantity) =>

    axios.put(

        `${BASE_URL}/${id}/add-stock`,

        {

            quantity

        },

        getAuthHeader()

    );

export const reduceStock = (id, quantity) =>

    axios.put(

        `${BASE_URL}/${id}/reduce-stock`,

        {

            quantity

        },

        getAuthHeader()

    );