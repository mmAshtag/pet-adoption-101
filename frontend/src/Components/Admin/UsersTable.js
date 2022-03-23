import React, { useContext } from "react";
import UserBox from "./UserBox";
import { AdminContext } from "../../Context/AppContext";
import List from '@mui/material/List';
import ListSubheader from "@mui/material/ListSubheader";

function UsersTable() {    
    const { usersList } = useContext(AdminContext)

    return (
        <div style={{ marginTop: "70px"}}>
            <List sx={{ width: '100%', minWidth: 700, bgcolor: '#daeeff', borderRadius: 3 }} component="nav"
                subheader={
                    <ListSubheader component="div" sx={{ bgcolor: "#91ccfd" }}>
                        <span style={{ marginRight: "140px"}}>Users</span>
                        <span style={{ marginRight: "180px"}}>Email</span>
                        <span>Phone</span>
                    </ListSubheader>}>
                {usersList.map(user => (
                    <UserBox key={user.id} user={user}/>
                ))}
            </List>
        </div>
    )
}

export default UsersTable