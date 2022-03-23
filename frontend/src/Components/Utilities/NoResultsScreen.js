import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import dogGif from "../../lib/images/doggif.gif"
import { CustomColorButton } from '../../lib/styles'
import { useNavigate } from "react-router";

const NoResultsScreen = (props) => {
    const { text } = props
    const navigate = useNavigate();

    return (
        <div className="noResultsPageContainer">
            <Grid>
                <Typography sx={{ marginTop: 25, fontSize: "h4.fontSize" }}>{text}</Typography>
                <img src={dogGif} alt="Dog gif" width="50%" height="20%" />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CustomColorButton
                        size="large"
                        variant="contained"
                        onClick={() => navigate("/home/pets")}
                        sx={{ marginRight: 3 }}
                    >
                        All Pets
                    </CustomColorButton>
                    <CustomColorButton
                        size="large"
                        variant="contained"
                        onClick={() => navigate("/search")}
                        className="hoverEvent"
                    >
                        Search for a pet
                    </CustomColorButton>
                </Box>
            </Grid>
        </div>
    )
}

export default NoResultsScreen