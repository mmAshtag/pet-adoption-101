import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import Box from "@mui/material/Box";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { adoptOrFosterPet, savePet, deleteSavedPet, returnPet, getPetById, isPetSaved } from "../../lib/APIs/petsApi";
import { useNavigate, useParams } from "react-router-dom";


function PetProfile() {
    const { setViewedPet, viewedPet, currentUser } = useContext(AppContext);
    const [savedPet, setSavedPet] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    const canFosterIt = viewedPet.adoptionStatus === "Available" ? false : true;
    const canReturnIt = viewedPet.userId === currentUser.id ? false : true;
    const canAdoptIt =
      viewedPet.userId === currentUser.id
        ? viewedPet.adoptionStatus === "Adopted"
          ? true
          : false
        : viewedPet.adoptionStatus === "Available"
        ? false
        : true

    const adoptOrFoster = async (event) => {
        if (event.target.value === "foster") viewedPet.adoptionStatus = "Fostered"
        else viewedPet.adoptionStatus = "Adopted"
        
        try {
          // Change to get updates from db bc adopt btn doesn't update on foster click
          await adoptOrFosterPet(viewedPet, currentUser.id)
          setViewedPet({ ...viewedPet, adoptionStatus: viewedPet.adoptionStatus })
        } catch(err) {
          console.log(err)
        }
    }

    const returnIt = async () => {
        try {
          await returnPet(viewedPet)
          setViewedPet({ ...viewedPet, adoptionStatus: "Available"})
        } 
        catch(err) {
          console.log(err)
        }
    }

    const saveOrUnsave = async (event) => {
      if (event.target.value === "save") {
        try {
          await savePet(viewedPet, currentUser.id);
          setSavedPet(true);
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await deleteSavedPet(viewedPet.id, currentUser.id);
          setSavedPet(false);
        } catch (err) {
          console.log(err)
        }
      }
    }

    useEffect(() => {
      let subscribed = true
      isPetSaved(currentUser.id, viewedPet.id).then(data => {
        if (subscribed) {
          setSavedPet(data.data);
        }
      })

      return () => { subscribed = false }
    }, [viewedPet, savedPet, currentUser.id])

    useEffect(() => {
      let subscribed = true
      getPetById(id).then(data => {
        if (subscribed) {
          setViewedPet(data.pet)
        }
      })

      return () => { subscribed = false }
    }, [id, canAdoptIt, canReturnIt, savedPet, setViewedPet])

    return (
        <div style={{ marginTop: "70px"}}>
            <div style={{ display: "flex", justifyContent: "flex-start", margin: 5 }}>
                <Button onClick={() => navigate(-1)}>
                    <ArrowLeftIcon/>
                    Back
                </Button>
            </div>
            <span>Pet profile page</span>
            <div className="petProfileContainer" >
                <div className="petInfoContainer">
                    <Typography component="h1" variant="h5">Name: { viewedPet.name }</Typography>
                    <Typography component="h1" variant="h5">Type: { viewedPet.type }</Typography>
                    <Typography component="h1" variant="h5">Breed: { viewedPet.breed }</Typography>
                    <Typography component="h1" variant="h5">Colour: { viewedPet.color }</Typography>
                    <Typography component="h1" variant="h5">Status: { viewedPet.adoptionStatus }</Typography>
                    <Typography component="h1" variant="h5">Height: { viewedPet.height }cm</Typography>
                    <Typography component="h1" variant="h5">Weight: { viewedPet.weight }kg</Typography>
                    <Typography component="h1" variant="h5">Dietary: { viewedPet.dietary }</Typography>            
                    <Typography component="h1" variant="h5">Hypoallergenic: { viewedPet.hypoallergenic ? "True" : "False" }</Typography>
                    <Box>
                        <Typography component="h1" variant="h5">Bio: { viewedPet.bio ? viewedPet.bio : "-" }</Typography>
                    </Box>
                </div>
                <div className="petPicContainer">
                    <div className="petPic">
                        <img src={viewedPet.picture} alt="Pet pic" height="400px"/>
                    </div>
                    <div style={{ display: "flex", direction: "row", justifyContent: "space-evenly"}}>
                        <ButtonGroup variant="text">
                            {savedPet ? <Button value="unsave" onClick={saveOrUnsave}>Unsave</Button> : <Button value="save" onClick={saveOrUnsave}>Save</Button>}
                            <Button onClick={adoptOrFoster} value="adopt" disabled={canAdoptIt}>Adopt</Button>
                            <Button onClick={adoptOrFoster} value="foster" disabled={canFosterIt}>Foster</Button>
                            <Button onClick={returnIt} disabled={canReturnIt}>Return</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetProfile