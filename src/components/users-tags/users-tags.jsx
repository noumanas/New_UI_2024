import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { config } from "../../enviorment/enviorment";

const UserTags = ({ users, artistId }) => {
    const navigate = useNavigate();
    const [disable, setDisabled] = useState(false);

    const handleDelete = async (artistId, userId) => {
        try {
            setDisabled(true);

            await axios.delete(`${config.BASE_URL}/artists/${artistId}/remove-associate/${userId}`, {
                headers: {
                    "authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            toast.success("You have removed the A&R successfully.");

            setTimeout(() => {
                navigate(0);
            }, 2500);
        }
        catch (error) {
            toast.error(error.message);
            setDisabled(false);
        }
    };

    return users && users.map((usr) => (
        <Chip label={usr.email} disabled={disable} onDelete={() => handleDelete(artistId, usr?._id)} color="primary" variant="outlined" style={{ margin: "10px", color: "#FFF" }} />
        
    ))

}

export default UserTags;