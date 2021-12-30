import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/"

const getAdminBoard = () => {
    return axios.get(API_URL + "listUsers", { headers: authHeader() })
}

const addUser = (email, firstName, lastName) => {
    return axios.post(API_URL + "createUser", {email, firstName, lastName}, { headers: authHeader() })
}

const deleteUser = (userId) => {
    return axios.delete(API_URL + `deleteUser/${userId}`, { headers: authHeader() })
}

const updateUser = (email, firstName, lastName) => {
    const data = {email}
    if(firstName) {
        data.firstName = firstName
    }
    if(lastName) {
        data.lastName = lastName
    }
    return axios.patch(API_URL + "updateUser", data, { headers: authHeader() })
}

export default {
    getAdminBoard,
    addUser,
    deleteUser,
    updateUser
}