import React, { useEffect, useContext } from "react";
import PetCard from "../Pets/PetCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AppContext } from "../../Context/AppContext";
import { getAllPetsToEdit } from "../../lib/APIs/adminApi";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


function PetsToEdit() {
  const navigate = useNavigate();
  const { petsList, setPetsList } = useContext(AppContext);

  useEffect(() => {
      const pets = async () => {
          const data = await getAllPetsToEdit();
          setPetsList(data.pets)
        }
        return () => pets()
    // eslint-disable-next-line
  }, []);

  return (
    <Box style={{ marginTop: "70px" }}>
      <div>
        <Typography variant="h3" sx={{ marginBottom: 3 }}>Admin Edit Pet</Typography>
        <ButtonGroup>
            <Button onClick={() => navigate("/admin")}>Users</Button>
            <Button onClick={() => navigate("/admin/addpet")}>Add pet</Button>
        </ButtonGroup>
      </div>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {petsList.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </Grid>
    </Box>
  );
}

export default PetsToEdit;
