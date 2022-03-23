import axios from "axios";

const BASEURL = "http://localhost:5050";
const jwt = localStorage.getItem("token");
const config = { headers: { authorization: `Bearer ${jwt}`} };

export async function getAllPets() {
    const jwt = localStorage.getItem("token");
    const config = { headers: { authorization: `Bearer ${jwt}`} };

    try {
        const res = await axios.get(BASEURL + "/pets", config)
        return res.data
    } catch(err) {
        console.log(err)
    }
}

export async function getPetById(petId) {
    try {
        const res = await axios.get(BASEURL + `/pets/:${petId}`, config)
        return res.data
    } catch(err) {
        return err.response
    }
}

export async function getSavedPets(userId) {
    try {
        const res = await axios.get(BASEURL + `/pets/:${userId}/saved`, config)
        return res.data
    } catch(err) {
        console.log(err)
    }
}

export async function isPetSaved(userId, petId) {
    try {
        const res = await axios.get(BASEURL + `/pets/:${userId}/:${petId}/issaved`, config)
        return res.data
    } catch(err) {
        console.log(err)
    }
}

export async function getPetsByUserId(userId) {
    try {
        const res = await axios.get(BASEURL + `/pets/:${userId}/mypets`, config)
        return res.data
    } catch(err) {
        console.log(err)
    }
}

export async function adoptOrFosterPet(pet, userId) {
    try {
        const res = await axios.post(BASEURL + `/pets/:${pet.id}/adopt`, { pet, userId }, config)
        return res.data
    } catch(err) {
        console.log(err)
    }
}

export async function returnPet(pet) {
    try {
        const res = await axios.post(BASEURL + `/pets/:${pet.id}/return`, { pet }, config)
    return res.data
    } catch(err) {
        console.log(err)
    }
}

export async function savePet(pet, userId) {
    try {
        const res = await axios.post(BASEURL + `/pets/:${pet.id}/save`, { pet, userId }, config)
        return res.data
    } catch(err) {
        console.log(err)
    }
}

export async function deleteSavedPet(petId, userId) {
    try {
        const res = await axios.delete(BASEURL + `/pets/:${petId}/:${userId}`, config)
        return res
    } catch(err) {
        console.log(err)
    }
}

export async function petSearch(query) {
    const queryString = Object.keys(query).map(key => `${key}=${query[key]}`).join("&")
    try {
        const res = await axios.get(BASEURL + `/pets/search?${queryString}`)
        return res.data
    } catch(err) {
        console.log(err)
    }
}