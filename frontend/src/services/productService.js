import axios from 'axios';

const BASE_URL = 'http://localhost:1111/api/products';

export const getAllProducts = (page = 0, size = 8) => {

    return axios.get(BASE_URL, {

        params: {
            page,
            size
        }

    });

};
export const getProductById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

export const searchProducts =(keyword)=> {

    return axios.get(`${BASE_URL}/search`, {

        params: {
            keyword
        }

    });

}