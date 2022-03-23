import React, { useContext } from 'react'
import { Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

function HomePage() {
  // const [savedPetsList, setSavedPetsList] = useState([]);
  // const [myPetsList, setMyPetsList] = useState([]);
  const { currentUser } = useContext(AppContext)
  const navigate = useNavigate();

  return (
          <div>
              <Typography className="welcomeHeadings" variant="light" component="div" sx={{ textAlign: "center", fontSize: "h3.fontSize", mb: 1 }}>
                  Welcome {currentUser.firstName} {currentUser.lastName}
              </Typography>
              <Typography>Get started now!</Typography>
              <Box>
                <Button size="large" variant="outlined" onClick={() => navigate("/home/pets")}>Find a pet</Button>
                <Button size="large" variant="outlined" onClick={() => navigate("/search")}>Search for a pet</Button>
                <Button size="large" variant="outlined" onClick={() => navigate("/home/pets/savedpets")}>Saved pets</Button>
                <Button size="large" variant="outlined" onClick={() => navigate("/home/pets/mypets")}>My pets</Button>
              </Box>
              <Box sx={{display: "flex", justifyContent: "center"}}>
                <Outlet/>
              </Box>
          </div>
  );
}

export default HomePage