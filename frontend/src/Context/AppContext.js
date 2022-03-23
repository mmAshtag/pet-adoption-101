import { createContext } from "react"

export const AppContext = createContext({
    petsList: [],
    setPetsList: () => {},
    currentUser: {},
    setCurrentUser: () => {},
    viewedPet: {},
    setViewedPet: () => {}
})

export const PersonalPetsContext = createContext({
    savedPetsList: [],
    setSavedPetsList: () => {},
    myPetsList: [],
    setMyPetsList: () => {}
})

export const AdminContext = createContext({
    usersList: [],
    setUsersList: () => {}
})