import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AppContext } from "../../Context/AppContext"
import { updateUser } from "../../lib/APIs/usersApi"

function Profile() {
  const { currentUser, setCurrentUser } = useContext(AppContext)
  const [errorMsg, setErrorMsg] = useState("");
  const [inputValues, setInputValues] = useState({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      tel: currentUser.tel,
      email: currentUser.email,
      password: currentUser.password,
      bio: currentUser.bio
  })

  const inputHandler = (event) => {
      const { name, value } = event.target
      setInputValues({ ...inputValues, [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (0 < inputValues.password.length && inputValues.password.length < 6) {
      setErrorMsg("Password requires at least 6 characters")
      return
    } else if (inputValues.password.length === 0) {
      setErrorMsg("Password required to update details");
      return
    }
    updateUser(inputValues, currentUser.id)
      .then((data) => {
        if (typeof data === "string") {
            setErrorMsg(data)
            return
        }
        setErrorMsg("")
      }).catch((err) => console.log(err));
    setInputValues({ ...inputValues, password: "" })
  }

  if (Object.keys(currentUser).length === 0) return <></>
  return (
      <Box maxWidth="400px" sx={{ margin: "70px" }}>
          <Typography className="welcomeHeadings" variant="light" sx={{fontSize: "h5.fontSize"}}>Update your details</Typography>
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <Grid container spacing={2} maxWidth="xs" sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  label="First Name"
                  variant="standard"
                  fullWidth
                  onChange={inputHandler}
                  defaultValue={currentUser.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  variant="standard"
                  fullWidth
                  onChange={inputHandler}
                  defaultValue={currentUser.lastName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="tel"
                  label="Phone Number"
                  type="tel"
                  variant="standard"
                  fullWidth
                  onChange={inputHandler}
                  defaultValue={currentUser.tel}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="standard"
                  fullWidth
                  onChange={inputHandler}
                  defaultValue={currentUser.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  variant="standard"
                  fullWidth
                  onChange={inputHandler}
                  defaultValue={""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="bio"
                  label="Add bio"
                  type="textarea"
                  fullWidth
                  onChange={inputHandler}
                  defaultValue={currentUser.bio}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}><span style={{ color: "red"}}>{errorMsg}</span></Grid>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}>
              <Button type="submit" size="medium" variant="contained" sx={{ mt: 3, mb: 2 }}>Save</Button>
            </Grid>
          </Box>
      </Box>
  );
}

export default Profile;