import React, { useState, useContext } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from 'react-router';
import { loginUser } from "../../lib/APIs/usersApi";
import { AppContext } from "../../Context/AppContext"

function Login(props) {
    const { setIsLoginOpen } = props
    const navigate = useNavigate()
    const { setCurrentUser } = useContext(AppContext)
    const [errorMsg, setErrorMsg] = useState("")
    const [inputValues, setInputValues] = useState({ email: '', password: '' })

    const inputHandler = (event) => {
        const { name, value } = event.target
        setInputValues({ ...inputValues, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
          email: inputValues.email,
          password: inputValues.password,
        }
        
        loginUser(user)
          .then((data) => {
            if (typeof data === "string") {
                setErrorMsg(data)
                return
            }
            localStorage.setItem("token", data.token);
            setCurrentUser(data.user);
            setIsLoginOpen(false);
            navigate("/home");
          }).catch((err) => console.log(err));
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "gold"}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h4" sx={{ mb: 2 }}>Log In</Typography>
                <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                name="email"
                                label="Email"
                                type="email"
                                onChange={inputHandler}
                                value={inputValues.email}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="password"
                                label="Password"
                                type="password"
                                onChange={inputHandler}
                                value={inputValues.password}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item sx={{ ml: 1, color: "red" }}>{errorMsg}</Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Log in
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;
