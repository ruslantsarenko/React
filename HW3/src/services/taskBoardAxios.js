import axios from "axios";

const API = `https://679286cdcf994cc6804a5368.mockapi.io/tasks`;
const service = {
    get: (id) => axios(API + (id ? `/${id}` : ``)).then(({ data }) => data)
}

export default service;