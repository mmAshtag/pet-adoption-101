import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { loginAdmin } from "../../lib/APIs/adminApi"
// Assign adminToken to admin

function AdminLogin() {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState("")
    const [inputValues, setInputValues] = useState({ userName: '', password: '' })

    const inputHandler = (event) => {
        const { name, value } = event.target
        setInputValues({ ...inputValues, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const admin = {
          userName: inputValues.userName,
          password: inputValues.password,
        }
        
        loginAdmin(admin)
          .then(data => {
              if (typeof data === "string") {
                  setErrorMsg(data)
                  return
                }
                localStorage.setItem("adminToken", data.adminToken);
                navigate("/admin");
          }).catch((err) => console.log(err));
    }


    return (
            <div className="adminLogin">
                <Box sx={{ border: 1, display: "flex", flexDirection: "column", alignItems: "center", p: 7 }}>
                    <Typography component="h1" variant="h4" sx={{ mb: 2 }}>Admin Log In</Typography>
                    <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    name="userName"
                                    label="User Name"
                                    type="text"
                                    onChange={inputHandler}
                                    value={inputValues.userName}
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
            </div>
    )
}

export default AdminLogin;
