import axios from "axios";

const BASE_URL = "http://localhost:1111/api/categories";

export const getCategories = () => {

    return axios.get(BASE_URL);

};