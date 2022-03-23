import React, { useContext, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { PersonalPetsContext, AppContext } from '../../Context/AppContext'
import PetCard from './PetCard'
import { getSavedPets } from "../../lib/APIs/petsApi"
import NoResultsScreen from '../Utilities/NoResultsScreen'

function SavedPets() {
    const { savedPetsList, setSavedPetsList } = useContext(PersonalPetsContext)
    const { currentUser } = useContext(AppContext)
    const [noSavedPetsMsg, setNoSavedPetsMsg] = useState("")

    useEffect(() => {
      let subscribed = true
      getSavedPets(currentUser.id).then(data => {
        if (subscribed) {
          if (data.pets.length === 0) {
            setSavedPetsList([])
            setNoSavedPetsMsg("You currently have no pets saved")
            return
          }
          setSavedPetsList(data.pets)
        }
      })

      return () => { subscribed = false }
    }, [currentUser.id, setSavedPetsList])

    return (
      <div style={{ marginTop: "70px" }}>
        {savedPetsList.length > 0 && (
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {savedPetsList.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </Grid>
        )}
        {noSavedPetsMsg && (
          <NoResultsScreen text={noSavedPetsMsg} />
        )}
      </div>
    );
}

export default SavedPets