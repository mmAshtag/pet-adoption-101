import axios from "axios";

const BASEURL = "http://localhost:5050"

export async function getUserToken() {
    const jwt = localStorage.getItem("token");
    const config = { headers: { authorization: `Bearer ${jwt}` } };

    try {
        const response = await axios.get(BASEURL + "/users/token", config)
        return response.data
    } catch(err) {
        return err.response
    }
}

export async function createUserAccount(user) {
    try {
        const response = await axios.post(BASEURL + "/users", user);
        return response.data
    } catch(err) {
        return err.response.data;
    }
}

export async function loginUser(user) {
    try {
        const response = await axios.post(BASEURL + "/users/login", user)
        return response.data
    } catch(err) {
        return err.response.data;
    }
}

export async function updateUser(user, id) {
    let jwt = localStorage.getItem("token");
    const config = { headers: { authorization: `Bearer ${jwt}` } };

    try {
        const response = await axios.put(BASEURL + `/users/:${id}`, user, config)
        return response.data
    } catch(err) {
        return err.response.data
    }
}