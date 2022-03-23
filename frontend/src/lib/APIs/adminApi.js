import axios from "axios";

const BASEURL = "http://localhost:5050";
const jwt = localStorage.getItem("adminToken");
const config = { headers: { authorization: `Bearer ${jwt}` } };

export async function getAdminToken() {
    const jwt = localStorage.getItem("adminToken");
    const config = { headers: { authorization: `Bearer ${jwt}` } };

    try {
        const response = await axios.get(BASEURL + "/admin/token", config)
        return response.data
    } catch(err) {
        return err.response
    }
}

export async function loginAdmin(user) {
    try {
        const res = await axios.post(BASEURL + "/admin/login", user)
        return res.data
    } catch(err) {
        return err.response.data
    }
}

export async function getAllUsers() {
    const jwt = localStorage.getItem("adminToken");
    const config = { headers: { authorization: `Bearer ${jwt}` } };

    try {
        const res = await axios.get(BASEURL + "/admin/users", config)
        return res.data
    } catch(err) {
        return err.response
    }
}

export async function getUserWithOwnedPets(userId) {
    try {
        const res = await axios.get(BASEURL + `/admin/:${userId}/full`, config)
        return res.data
    } catch(err) {
        return err.response
    }
}

export async function getAllPetsToEdit() {
    try {
        const res = await axios.get(BASEURL + "/admin/pets", config)
        return res.data
    } catch(err) {
        console.log(err)
    }
}

export async function getSinglePetToEdit(petId) {
    try {
        const res = await axios.get(BASEURL + `/admin/:${petId}`, config);
        return res.data;
    } catch (err) {
        return err.response
    }
}

export async function addPet(pet) {
    try {
        const res = await axios.post(BASEURL + "/admin/addpet", pet, config);
        return res.data
    } catch (err) {
        return err.response.data;
    }
}

export async function updatePet(pet, petId) {
    try {
        const res = await axios.put(BASEURL + `/admin/:${petId}/editpet`, pet, config);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
}