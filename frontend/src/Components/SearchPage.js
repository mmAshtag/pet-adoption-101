import React, { useState } from 'react'
import { Typography } from '@mui/material'
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { petSearch } from '../lib/APIs/petsApi';
import PetCard from "./Pets/PetCard"

function SearchPage() {
    const [searchPets, setSearchPets] = useState([]);
    const [noResultsMsg, setNoResultsMsg] = useState("");
    const [showAdvancedSearch, setshowAdvancedSearch] = useState(false);
    const [petQueryObj, setPetQueryObj] = useState({
        type: "",
        status: "",
        name: "",
        weight: 0,
        height: 0,
    });

    function searchToggleHandler() {
        setshowAdvancedSearch(prev => !prev)

        // Reset advanced fields
        setPetQueryObj({
            type: "",
            status: "",
            name: "",
            weight: 0,
            height: 0,
        })
    }

    const searchInputHandler = (event) => {
        const { name, value } = event.target
        setPetQueryObj(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const basicSearchQuery = petQueryObj.type ? { type: petQueryObj.type } : {}
        const data = await petSearch( !showAdvancedSearch ? basicSearchQuery : petQueryObj )

        // If no pets - response will be a string with no pets msg
        if (typeof data.pets === "string") {
            setSearchPets([]);
            setNoResultsMsg(data.pets)
        } else {
            setNoResultsMsg("");
            setSearchPets(data.pets);
        }
    }

    return (
        <div style={{ marginTop: "70px" }}>
            <Typography component="h1" variant="h3" sx={{ p: 2 }}>Search for a pet</Typography>
            <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TextField
                        label="Type"
                        type="search"
                        name="type"
                        sx={{ width: 300 }}
                        value={petQueryObj.type}
                        onChange={searchInputHandler}
                    />
                    <FormControlLabel label="Advanced search" control={<Checkbox checked={showAdvancedSearch} onClick={searchToggleHandler} />} />
                    { showAdvancedSearch &&
                        <Box maxWidth="300px" sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Grid container spacing={2} maxWidth="xs">
                                <Grid item xs={12}>
                                    <FormControl sx={{ width: 250, marginTop: 2 }}>
                                        <InputLabel id="status">Status</InputLabel>
                                        <Select
                                            labelId="status"
                                            id="status"
                                            label="Status"
                                            name="status"
                                            value={petQueryObj.status}
                                            onChange={searchInputHandler}
                                            fullWidth
                                        >
                                            <MenuItem value="Available">Available</MenuItem>
                                            <MenuItem value="Fostered">Fostered</MenuItem>
                                            <MenuItem value="Adopted">Adopted</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        type="search"
                                        name="name"
                                        value={petQueryObj.name}
                                        onChange={searchInputHandler}
                                        variant="standard"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField 
                                        type="number"
                                        label="Height (cm)"
                                        name="height"
                                        value={petQueryObj.height}
                                        onChange={searchInputHandler}
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField 
                                        type="number"
                                        label="Weight (kg)"
                                        name="weight"
                                        value={petQueryObj.weight}
                                        onChange={searchInputHandler}
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    }
                    <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>Search</Button>
                </Container>
                <Grid container sx={{ display: "flex", justifyContent: "center"}}>{noResultsMsg && <h1>{noResultsMsg}</h1>}</Grid>
                <Grid container spacing={2} sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
                    {searchPets.map((pet) => (
                        <PetCard key={pet.id} pet={pet} />
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default SearchPage