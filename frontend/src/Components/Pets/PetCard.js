import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getPetById } from "../../lib/APIs/petsApi";
import { getSinglePetToEdit } from "../../lib/APIs/adminApi"
import { AppContext } from "../../Context/AppContext";
import { Link } from 'react-router-dom';
import Modal from "@mui/material/Modal";
import { EditPetModalStyles } from "../../lib/styles";
import EditPet from "../Admin/EditPet"

function PetCard(props) {
    const { id, type, name, adoptionStatus, breed, picture } = props.pet
    const { setViewedPet } = useContext(AppContext)
    const [isEditOpen, setIsEditOpen] = useState(false);
    const adminToken = localStorage.getItem("adminToken")

    const setCurrentPet = async () => {
        const data = await getPetById(id);
        setViewedPet(data.pet);
    }

    const editPetModal = async () => {
        const data = await getSinglePetToEdit(id);
        setViewedPet(data.pet);
        setIsEditOpen(true);
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ maxWidth: 400, maxHeight: 600, minWidth: 300 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Picture currently unavailable"
                        height="180"
                        image= {picture}
                    />
                    <CardContent className="petCard-body">
                        <Typography gutterBottom variant="h5" component="div">{ name }</Typography>
                        <Box style={{ textAlign: "start" }}>
                            <Typography>Animal: { type }</Typography>
                            <Typography>Breed: { breed }</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: "flex", justifyContent: "space-between", pl: 0 }}>
                    <div className="petCard-status">
                        <Box className="petCard-status-flag">
                            <Typography sx={{ fontStyle: 'oblique' }}>{ adoptionStatus }</Typography>
                        </Box>
                    </div>
                    {adminToken && <Button variant="outlined" onClick={editPetModal} sx={{ marginLeft: 10}}>Edit</Button>}
                    <Button onClick={setCurrentPet}>
                        <Link to={`/home/pets/${id}`} className="seeMore">See More</Link>
                    </Button>
                </CardActions>
            </Card>
            <Modal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
                <Box sx={ EditPetModalStyles }>{<EditPet setIsEditOpen={setIsEditOpen}/>}</Box>
            </Modal>
        </Grid>
    )
}

export default PetCard
