import React, { useState } from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Login from "../Account/Login";
import SignUp from "../Account/SignUp";
import { SignInModalStyles } from '../../lib/styles';
import SidebarDrawer from "./SidebarDrawer";
import { useNavigate } from "react-router";

function Navbar() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [drawerStatus, setDrawerStatus] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)
    const token = localStorage.getItem("token")
    const adminToken = localStorage.getItem("adminToken");
    const navigate = useNavigate();

    const toggleDrawerHandler = (open) => (event) => { setDrawerStatus(open) };
    const handleMenu = (event) => { setAnchorEl(event.currentTarget) };
    const handleMenuClose = () => { setAnchorEl(null) }

    const signOut = () => {
        handleMenuClose();
        localStorage.removeItem("token")
        navigate("/")
    }

    const adminSignOut = () => {
        localStorage.removeItem("adminToken")
        navigate("/adminlogin")
    }

    const goToProfile = () => {
        handleMenuClose();
        navigate("/home/profile")
    }
    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar style={{ background: '#A17350' }}>
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" onClick={toggleDrawerHandler(!false)} sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
                        { !token && !adminToken && <>
                            <Button color="inherit" onClick={() => setIsLoginOpen(true)}>Login</Button>
                            <Button color="inherit" onClick={() => setIsSignupOpen(true)}>SignUp</Button>
                        </>}
                        { token && <>
                                    <IconButton size="large" onClick={handleMenu} color="inherit" >
                                        <AccountCircle color="inherit" />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem sx={{ px: 3 }} onClick={goToProfile}>Profile</MenuItem>
                                        <MenuItem sx={{ px: 3 }} onClick={signOut}>Log out</MenuItem>
                                    </Menu>
                                </> }
                        { adminToken && <Button color="inherit" onClick={adminSignOut}>Log Out</Button> }
                    </Toolbar>
                </AppBar>
            </Box>
            <SidebarDrawer drawerStatus={drawerStatus} toggleDrawerHandler={toggleDrawerHandler}/>
            <Modal open={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
                <Box sx={SignInModalStyles}>{<Login setIsLoginOpen={setIsLoginOpen}/>}</Box>
            </Modal>
            <Modal open={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
                <Box sx={SignInModalStyles}>{<SignUp setIsSignupOpen={setIsSignupOpen}/>}</Box>
            </Modal>
        </div>
    )
}

export default Navbar