import React, { useContext, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { PersonalPetsContext, AppContext } from '../../Context/AppContext'
import PetCard from './PetCard'
import { getPetsByUserId } from "../../lib/APIs/petsApi";
import NoResultsScreen from '../Utilities/NoResultsScreen'

function MyPets() {
    const { myPetsList, setMyPetsList } = useContext(PersonalPetsContext)
    const { currentUser } = useContext(AppContext)
    const [noOwnedPetsMsg, setNoOwnedPetsMsg] = useState("");

    useEffect(() => {
      let subscribed = true
      getPetsByUserId(currentUser.id).then(data => {
        if (data.pets.length === 0) {
          setMyPetsList([]);
          setNoOwnedPetsMsg("You aren't currently fostering or adopting any pets");
          return;
        }
        if (subscribed) {
          setMyPetsList(data.pets);
        }
      })

      return () => { subscribed = false }
    }, [currentUser.id, setMyPetsList])

    return (
      <div style={{ marginTop: "70px" }}>
        {myPetsList.length > 0 && (
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {myPetsList.length > 0 && myPetsList.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </Grid>
        )}
        {noOwnedPetsMsg && (
          <NoResultsScreen text={noOwnedPetsMsg} />
        )}
      </div>
    );
}

export default MyPets
