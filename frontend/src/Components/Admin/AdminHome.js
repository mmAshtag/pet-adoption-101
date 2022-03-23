import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import UsersTable from './UsersTable'
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"
import { AdminContext } from '../../Context/AppContext';
import { getAllUsers } from "../../lib/APIs/adminApi";

function AdminHome() {
    const [usersList, setUsersList] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const users = async () => {
            const data = await getAllUsers()
            if (data) {
                setUsersList(data.users)
            }
        }
        return () => users()
    }, [])

    return (
        <AdminContext.Provider value={{ usersList, setUsersList }}>
            <div style={{ marginTop: "70px"}}>
                <div>
                    <Typography variant="h3" sx={{ marginBottom: 3 }}>Admin Dashboard</Typography>
                    <ButtonGroup>
                        <Button onClick={() => navigate("/admin/editpet")}>Edit pet</Button>
                        <Button onClick={() => navigate("/admin/addpet")}>Add pet</Button>
                    </ButtonGroup>
                </div>
                <div>
                    {usersList && <div style={{ display: "flex", justifyContent: "center" }}>
                        <UsersTable/>
                    </div>}
                </div>
            </div>
        </AdminContext.Provider>
    )
}

export default AdminHome