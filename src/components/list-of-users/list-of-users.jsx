import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getArtistById } from "../../redux/slice/artist";
import { config as URLconfig } from "../../enviorment/enviorment";
import { BiArrowBack } from "react-icons/bi";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteOnwershipDialog from "../../dialogs/delete-ownership-dialog/delete-ownership-dialog";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UserListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const artist = useSelector((state) => state.artist.artist);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOwnership, setdeleteOwnership] = useState([]);
  const BASE_URL = URLconfig.BASE_URL;

  useEffect(() => {
    if (id && !artist) {
      initUIData();
    }
  }, [id, artist]);

  const initUIData = () => {
    dispatch(
      getArtistById({
        id,
      })
    );
  };

  useEffect(() => {
    if (artist && Object.keys(artist).length) {
      setUsers(artist?.users);
    }
  }, [artist]);

  const handleOpenDeleteDialog = (artistId, userId) => {
    setdeleteOwnership([artistId, userId]);
    setOpen(true);
  };

  const handleCloseDeleteDialog = (res) => {
    setOpen(false);
    if (res) {
      console.log(deleteOwnership);
      handleDelete(deleteOwnership[0], deleteOwnership[1]);
    }
  };

  const handleDelete = async (artistId, userId) => {
    let configAuth = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    axios
      .delete(
        `${BASE_URL}/artists/${artistId}/remove-associate/${userId}`,
        configAuth
      )
      .then(() => {
        setUsers(users.filter((x) => x._id !== userId));
        toast.success("You have removed the A&R successfully.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container maxWidth="xl">
      <Box varient="div" component="div" className={classess.page}>
        <Box varient="div" component="div" className={classess.page__box}>
          <Box
            varient="div"
            component="div"
            className={classess.page__box__header}
          >
            <BiArrowBack
              size={26}
              color="#d0d0d0"
              className={classess.page__box__header__icon}
              onClick={() => navigate(`/blig/view-artist/${id}`)}
            />
            <span className={classess.page__box__header__title}>A&R Users</span>
          </Box>
          <Box
            varient="div"
            component="div"
            className={classess.page__box__details}
          >
            <Avatar
              className={classess.page__box__details__avatar}
              src={artist?.avatar}
              alt={artist?.name}
            />
            <Box
              varient="div"
              component="div"
              className={classess.page__box__details__contain}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__box__details__contain__box}
              >
                <span
                  className={classess.page__box__details__contain__box__key}
                >
                  Name:
                </span>
                <span
                  className={classess.page__box__details__contain__box__value}
                >
                  {artist?.name}
                </span>
              </Box>
              <Box
                varient="div"
                component="div"
                className={classess.page__box__details__contain__box}
              >
                <span
                  className={classess.page__box__details__contain__box__key}
                >
                  Users:
                </span>
                <span
                  className={classess.page__box__details__contain__box__value}
                >
                  {users && users.length ? users.length : 0}
                </span>
              </Box>
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table className={classess.page__table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#FFF" }}>A&R</TableCell>
                  <TableCell sx={{ color: "#FFF" }} align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.length &&
                  users.map((user) => (
                    <TableRow
                      key={user.username}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={user?.profilePicture}
                            alt={user?.firstName}
                            sx={{ height: 50, width: 50, marginRight: 2 }}
                          />
                          <span
                            className={
                              classess.page__box__tracks__list__ul__li__name
                            }
                            title={user?.title}
                          >
                            {user?.firstName} {user?.lastName}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            handleOpenDeleteDialog(artist?._id, user._id)
                          }
                          aria-label="delete user"
                          component="label"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <DeleteOnwershipDialog
        onClose={handleCloseDeleteDialog}
        open={open}
        track={deleteOwnership}
      />
    </Container>
  );
};

export default UserListing;
