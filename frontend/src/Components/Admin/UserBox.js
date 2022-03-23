import React, { useState } from 'react'
import { getUserWithOwnedPets } from '../../lib/APIs/adminApi';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { v4 as uuidv4 } from "uuid";

function UserBox(props) {
    const { id, firstName, lastName, email, tel } = props.user;
    const [open, setOpen] = useState(false);
    const [userAndPetInfo, setUserAndPetInfo] = useState([])
    
    const handleClick = () => {
        getUserWithOwnedPets(id)
          .then(data => {
            setUserAndPetInfo(data.data)
          })
        setOpen(!open)
    };

    return (
        <div>
            <ListItemButton onClick={handleClick} sx={{ minWidth: 500 }} >
                <ListItemText>
                    <span>{firstName} {lastName}</span>
                    <span style={{ margin: "0 60px"}}>{email}</span>
                    <span>{tel}</span>
                </ListItemText>
                { open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {userAndPetInfo.length === 0 ? <span>No pets</span> : userAndPetInfo.map(item => (
                        <ListItemButton key={uuidv4()} sx={{ pl: 4, bgcolor: '#c0e3ff' }}>
                            <ListItemAvatar>
                                <Avatar alt={item.type} src={`http://${item.picture}`}/>
                            </ListItemAvatar>
                            <ListItemText>
                                <span style={{ margin: "0 30px"}}>{item.name}</span>
                                <span>({item.adoptionStatus})</span>
                            </ListItemText>
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </div>
    )
}

export default UserBox
