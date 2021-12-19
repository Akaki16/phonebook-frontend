import axios from 'axios';
const baseURL = ' http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseURL);
}

const create = (personObject) => {
    return axios.post(baseURL, personObject);
}

const deleteObject = (id, personObject) => {
    return axios.delete(`${baseURL}/${id}`, personObject);
}

const update = (id, personObject) => {
    return axios.put(`${baseURL}/${id}`, personObject);
}

export default { getAll, create, deleteObject, update };