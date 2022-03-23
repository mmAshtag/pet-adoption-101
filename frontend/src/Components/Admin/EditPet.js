import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { MenuProps } from "../../lib/styles";
import { AppContext } from "../../Context/AppContext"
import { dietRestrictions } from "../../lib/list-options/dietRestrictionsList";
import { updatePet } from "../../lib/APIs/adminApi";

function EditPet() {
    const { viewedPet } = useContext(AppContext)
    const [successMsg, setSuccessMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [file, setFile] = useState(viewedPet.picture)
    const [inputFields, setInputFields] = useState({
      type: viewedPet.type,
      breed: viewedPet.breed,
      adoptionStatus: viewedPet.adoptionStatus,
      name: viewedPet.name,
      color: viewedPet.color,
      height: viewedPet.height,
      weight: viewedPet.weight,
      hypoallergenic: viewedPet.hypoallergenic === 0 ? "false" : "true",
      bio: viewedPet.bio,
      dietary: [],
    });

    const uploadFileHandler = (event) => {
        setFile(event.target.files[0])
    }

    const inputFieldsHandler = (event) => {
        const { name, value } = event.target
        if (name === "hypoallergenic") {
            setInputFields({ ...inputFields, hypoallergenic: !inputFields.hypoallergenic });
        } else setInputFields({ ...inputFields, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", file);
        for (let key in inputFields) {
            formData.append(key, inputFields[key]);
        }

        updatePet(formData, viewedPet.id)
          .then((data) => {
            if (typeof data === "string") {
              setErrorMsg(data);
              return;
            }
            setErrorMsg("");
            setSuccessMsg(true)
          })
          .catch((err) => console.log(err));
        setTimeout(() => {
            setSuccessMsg(false)
        }, 6000)
    }

    return (
        <Box>
            <Typography className="welcomeHeadings" variant="light" sx={{ p: 0, fontSize: "h3.fontSize"}}>Update pet details</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ p: 3 }} alignItems="center">
                        <Grid item xs={6} md={4}>
                            <TextField
                                name="type"
                                label="Animal Type"
                                onChange={inputFieldsHandler}
                                defaultValue={inputFields.type}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                name="breed"
                                label="Breed"
                                onChange={inputFieldsHandler}
                                defaultValue={inputFields.breed}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                    name="color"
                                    label="Colour"
                                    onChange={inputFieldsHandler}
                                    defaultValue={inputFields.color}
                                    fullWidth
                                    required
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField
                                name="name"
                                label="Name"
                                onChange={inputFieldsHandler}
                                defaultValue={inputFields.name}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <FormControl>
                                <InputLabel htmlFor="Height">Height</InputLabel>
                                <OutlinedInput
                                    id="Height"
                                    name="height"
                                    label="Height"
                                    onChange={inputFieldsHandler}
                                    defaultValue={inputFields.height}
                                    required
                                    fullWidth
                                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <FormControl>
                                <InputLabel htmlFor="Weight">Weight</InputLabel>
                                <OutlinedInput
                                    id="Weight"
                                    name="weight"
                                    label="Weight"
                                    onChange={inputFieldsHandler}
                                    defaultValue={inputFields.weight}
                                    fullWidth
                                    required
                                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel id="Dietary">Dietary Restrictions</InputLabel>
                                <Select
                                    name="dietary"
                                    labelId="Dietary"
                                    multiple
                                    value={inputFields.dietary}
                                    defaultValue={[viewedPet.dietary]}
                                    onChange={inputFieldsHandler}
                                    input={<OutlinedInput label="DietaryRestrictions" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    fullWidth
                                >
                                    {dietRestrictions.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={inputFields.dietary.indexOf(name) > -1}/>
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <FormControl sx={{ width: 150 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="adoptionStatus"
                                    label="Adoption Status"
                                    value={inputFields.adoptionStatus ?? ""}
                                    onChange={inputFieldsHandler}
                                >
                                    <MenuItem value=""><em>Current: {inputFields.adoptionStatus}</em></MenuItem>
                                    <MenuItem value="Available">Available</MenuItem>
                                    <MenuItem value="Fostered">Fostered</MenuItem>
                                    <MenuItem value="Adopted">Adopted</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box sx={{ marginBottom: 2 }}>
                                <Box>Current restrictions: {viewedPet.dietary ? viewedPet.dietary.split(",").join(", ") : "None" }</Box>
                                {viewedPet.dietary && <Box color="red">Please re-click them to keep them!</Box>}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                name="bio"
                                label="Bio"
                                onChange={inputFieldsHandler}
                                defaultValue={inputFields.bio}
                                multiline
                                rows={3}
                                sx={{ width: "80%" }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControlLabel
                                name="hypoallergenic"
                                label="Hypoallergenic"
                                value={inputFields.hypoallergenic}
                                labelPlacement="start"
                                control={
                                    <Switch
                                        color="primary"
                                        checked={Boolean(inputFields.hypoallergenic)}
                                        onChange={inputFieldsHandler}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label htmlFor="file">
                                <span style={{ marginRight: 20, color: "#6A6A6A" }}>Update Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="file"
                                    name="file"
                                    label="file"
                                    onChange={uploadFileHandler}
                                />
                            </label>
                        </Grid>
                        <Grid item sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Update Pet
                            </Button>
                            { successMsg && <div>
                                <div className="successMsgContainer">
                                    <CheckCircleOutlineIcon style={{ color: "rgb(24, 161, 24)" }}/>
                                    <span className="successMsg">Pet successfully updated</span>
                                </div>
                            </div>}
                        </Grid>
                        <Grid item><span style={{ color: "red"}}>{errorMsg}</span></Grid>
                    </Grid>
            </Box>
        </Box>
    )
}

export default EditPet