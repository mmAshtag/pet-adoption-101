import React from 'react'
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Puppy from "../lib/images/puppy.jpg";

function LandingPage() {
  return (
          <div style={{
              backgroundImage: `url(${Puppy})`,
              height: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}>
            <div className="welcomeHeadingsContainer">
              <Box className="welcomeHeadings">
                <Typography className="welcomeHeader" variant="light" sx={{ fontSize: "h2.fontSize" }}>
                    Welcome to Pet Adoptions 101
                </Typography>
                <Typography className="welcomeSubs" sx={{ textAlign: "center", fontSize: "h5.fontSize", m: 1 }}>
                    Sign up or login to adopt or foster today or start searching now!
                </Typography>
              </Box>
            </div>
          </div>
  );
}

export default LandingPage;
