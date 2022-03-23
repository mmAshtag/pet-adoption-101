import React, { useEffect, useContext } from "react";
import PetCard from "./PetCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AppContext } from "../../Context/AppContext";
import { getAllPets } from "../../lib/APIs/petsApi";
import { Outlet } from "react-router-dom";

function PetsPage() {
  const { petsList, setPetsList } = useContext(AppContext);

  useEffect(() => {
    let subscribed = true
    getAllPets().then(data => {
      if (subscribed) {
        setPetsList(data.pets)
      }
    });

    return () => { subscribed = false }
  }, []);

  return (
    <Box style={{ marginTop: "70px"}}>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {petsList.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </Grid>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}

export default PetsPage;
