import React from 'react'
import { CustomColorButton } from "../lib/styles"
import errorPage from "../lib/images/errorPage.jpeg"
import { useNavigate } from "react-router";

const NotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            position: "relative"
        }}>
            <img src={errorPage} height="100%" width="100%" />
            <div id="pageNotFoundBtnContainer">
                <CustomColorButton size='large' variant='contained' onClick={() => navigate("/")}>
                    <span style={{ color: "#336667" }}>Back Home</span>
                    </CustomColorButton>
            </div>
        </div>
    )
}

export default NotFoundPage