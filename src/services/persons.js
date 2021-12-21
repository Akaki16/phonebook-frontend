import axios from 'axios';
const baseURL = '/api/persons';

const getAll = () => {
    return axios.get(baseURL);
}

const create = (personObject) => {
    return axios.post(baseURL, personObject);
}

const deleteObject = (id) => {
    return axios.delete(`${baseURL}/${id}`);
}

const update = (id, personObject) => {
    return axios.put(`${baseURL}/${id}`, personObject);
}

export default { getAll, create, deleteObject, update };