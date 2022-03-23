import React, { useState } from 'react'
import { addPet } from "../../lib/APIs/adminApi"
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { MenuProps } from '../../lib/styles';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from 'react-router-dom';
import { dietRestrictions } from '../../lib/list-options/dietRestrictionsList';

function AddPet() {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState(false);
    const [file, setFile] = useState()
    const [inputFields, setInputFields] = useState({
      type: "",
      breed: "",
      adoptionStatus: "",
      name: "",
      color: "",
      height: 0,
      weight: 0,
      hypoallergenic: false,
      bio: "",
      dietary: [],
    });

    const uploadFileHandler = (event) => {
        setFile(event.target.files[0])
    }

    const inputFieldsHandler = (event) => {
        const { name, value } = event.target
        if (name === "hypoallergenic") {
            setInputFields({ ...inputFields, hypoallergenic: !false });
        } else setInputFields({ ...inputFields, [name]: value });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        
        const formData = new FormData();
        formData.append("file", file);
        for (const key in inputFields) {
            formData.append(key, inputFields[key]);
        }

        addPet(formData)
          .then((data) => {
            if (typeof data === "string") {
              setErrorMsg(data);
              return;
            }
            setErrorMsg("");
            setSuccessMsg(true)
          })
          .catch((err) => console.log(err));
        // Clear inputs below
        // setFile("");
        // setInputFields({
        //   type: "",
        //   breed: "",
        //   adoptionStatus: "",
        //   name: "",
        //   color: "",
        //   height: 0,
        //   weight: 0,
        //   bio: "",
        //   dietary: [],
        // });
        setTimeout(() => {
            setSuccessMsg(false)
        }, 6000)
    }

    return (
        <div style={{ marginTop: "70px" }}>
            <div>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>Admin Add Pet</Typography>
                <ButtonGroup sx={{ marginBottom: 1 }}>
                    <Button onClick={() => navigate("/admin")}>Users</Button>
                    <Button onClick={() => navigate("/admin/editpet")}>Edit pet</Button>
                </ButtonGroup>
            </div>
            <Box component="form" sx={{ margin: "0 70px" }} onSubmit={handleSubmit}>
                <FormGroup sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Grid container spacing={2} sx={{ p: 3 }} alignItems="center" maxWidth={"700px"}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="type"
                                label="Animal Type"
                                onChange={inputFieldsHandler}
                                value={inputFields.type}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="breed"
                                label="Breed"
                                onChange={inputFieldsHandler}
                                value={inputFields.breed}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                    name="color"
                                    label="Colour"
                                    onChange={inputFieldsHandler}
                                    value={inputFields.color}
                                    fullWidth
                                    required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="name"
                                label="Name"
                                onChange={inputFieldsHandler}
                                value={inputFields.name}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl>
                                <InputLabel htmlFor="Height">Height</InputLabel>
                                <OutlinedInput
                                    id="Height"
                                    name="height"
                                    label="Height"
                                    type="number"
                                    onChange={inputFieldsHandler}
                                    value={inputFields.height}
                                    required
                                    fullWidth
                                    endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl>
                                <InputLabel htmlFor="Weight">Weight</InputLabel>
                                <OutlinedInput
                                    id="Weight"
                                    name="weight"
                                    label="Weight"
                                    type="number"
                                    onChange={inputFieldsHandler}
                                    value={inputFields.weight}
                                    fullWidth
                                    required
                                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl sx={{ width: 150 }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="adoptionStatus"
                                    label="Adoption Status"
                                    onChange={inputFieldsHandler}
                                    value={inputFields.adoptionStatus}
                                    fullWidth
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="Available">Available</MenuItem>
                                    <MenuItem value="Fostered">Fostered</MenuItem>
                                    <MenuItem value="Adopted">Adopted</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl sx={{ width: 400 }}>
                                <InputLabel id="Dietary">Dietary Restrictions</InputLabel>
                                <Select
                                    name="dietary"
                                    labelId="Dietary"
                                    multiple
                                    value={inputFields.dietary}
                                    onChange={inputFieldsHandler}
                                    input={<OutlinedInput label="DietaryRestrictions" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    fullWidth
                                >
                                    {dietRestrictions.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={inputFields.dietary.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControlLabel
                                name="hypoallergenic"
                                label="Hypoallergenic"
                                onChange={inputFieldsHandler}
                                value={inputFields.hypoallergenic}
                                control={<Switch color="primary" />}
                                labelPlacement="start"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ px: 3 }} direction="column" alignItems="flex-start" maxWidth={"700px"}>
                        <Grid item>
                            <TextField
                                sx={{ width: "310%" }}
                                name="bio"
                                label="Bio"
                                onChange={inputFieldsHandler}
                                value={inputFields.bio}
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid item>
                            <label htmlFor="file">
                                <span style={{ marginRight: 20, color: "#6A6A6A" }}>Image*</span>
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
                        <Grid item><span style={{ color: "red"}}>{errorMsg}</span></Grid>
                        <Grid item sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Add Pet
                            </Button>
                            { successMsg && <div>
                                <div className="successMsgContainer">
                                    <CheckCircleOutlineIcon style={{ color: "rgb(24, 161, 24)" }}/>
                                    <span className="successMsg">Pet uploaded successfully</span>
                                </div>
                            </div>}
                        </Grid>
                    </Grid>
                </FormGroup>
            </Box>
        </div>
    )
}

export default AddPet
