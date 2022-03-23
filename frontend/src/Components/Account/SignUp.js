import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createUserAccount } from "../../lib/APIs/usersApi";
import { AppContext } from "../../Context/AppContext";

function SignUp(props) {
    const { setIsSignupOpen } = props
    const { setCurrentUser } = useContext(AppContext);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("")
    const [inputValues, setInputValues] = useState({
        firstName: '',
        lastName: '',
        tel: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const inputHandler = (event) => {
        const { name, value } = event.target
        setInputValues({ ...inputValues, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValues.password.length < 6) {
            setErrorMsg("Password must have atleast 6 characters");
            return
        }

        createUserAccount(inputValues)
        .then((data) => {
            if (typeof data === "string") {
                setErrorMsg(data)
                return
            }
            localStorage.setItem("token", data.token);
            setCurrentUser(data.user)
            setErrorMsg("");
            setIsSignupOpen(false)
            navigate("/home");
        }).catch(err => console.log(err))

        // setInputValues({
        //     firstName: "",
        //     lastName: "",
        //     tel: "",
        //     email: "",
        //     password: "",
        //     confirmPassword: ""
        // })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Avatar sx={{ m: 1, bgcolor: "gold"}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h4" sx={{ mb: 2 }}>Sign Up</Typography>
                <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                label="First Name"
                                onChange={inputHandler}
                                value={inputValues.firstName}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastName"
                                label="Last Name"
                                onChange={inputHandler}
                                value={inputValues.lastName}
                                fullWidth 
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                name="tel"
                                label="Phone Number"
                                type="tel"
                                onChange={inputHandler}
                                value={inputValues.tel}
                                fullWidth
                            />
                        </Grid>
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
                        <Grid item xs={12}>
                            <TextField 
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                onChange={inputHandler}
                                value={inputValues.confirmPassword}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>{errorMsg}</Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default SignUp