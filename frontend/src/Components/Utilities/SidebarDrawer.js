import React from 'react'
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SvgIcon from "@mui/material/SvgIcon";
import SearchIcon from "@mui/icons-material/Search";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router";

function SidebarDrawer(props) {
    const { drawerStatus, toggleDrawerHandler } = props
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    const returnHome = () => {
        if (token) navigate("/home");
        else navigate("/");
    }
    const goToSearchPage = () => {navigate("/search")}
    const goToPetsPage = () => {navigate("/home/pets")}
    const goToMyPets = () => {navigate("/home/pets/mypets")}
    const goToSavedPets = () => {navigate("/home/pets/savedpets")}

    return (
        <Drawer open={drawerStatus} onClose={toggleDrawerHandler(false)} anchor={"left"} >
            <Box sx={{ width: 220 }} onClick={toggleDrawerHandler(false)}>
                <List>
                    <ListItem button onClick={returnHome}>
                        <ListItemIcon>
                            <SvgIcon color="primary">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </SvgIcon>
                        </ListItemIcon>
                        <ListItemText className="sidebarOptions">Home</ListItemText>
                    </ListItem>
                    <ListItem button onClick={goToSearchPage}>
                        <ListItemIcon>
                            <SearchIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary={"Search"} className="sidebarOptions"/>
                    </ListItem>
                    { token && 
                        <>
                            <ListItem button onClick={goToMyPets}>
                                <ListItemIcon>
                                    <FavoriteSharpIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText primary={"My Pets"} className="sidebarOptions"/>
                            </ListItem>
                            <ListItem button onClick={goToSavedPets}>
                                <ListItemIcon>
                                    <BookmarkIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText primary={"Saved Pets"} className="sidebarOptions"/>
                            </ListItem>
                            <ListItem button onClick={goToPetsPage}>
                                <ListItemIcon>
                                    <PetsIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText primary={"All Pets"} className="sidebarOptions"/>
                            </ListItem>
                        </>
                    }
                </List>
            </Box>
        </Drawer>
    )
}

export default SidebarDrawer;