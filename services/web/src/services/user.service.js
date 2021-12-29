import axios from "axios"
import authHeader from "./auth-header"

const API_URL = "http://localhost:8000/api/"

const getUserBoard = () => {
    return axios.get(API_URL + "listBooksByAuthors", { headers: authHeader() })
}

const getAdminBoard = () => {
    return axios.get(API_URL + "listUsers", { headers: authHeader() })
}

export default {
    getUserBoard,
    getAdminBoard
}
