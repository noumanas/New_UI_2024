import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ArtistContractList from "../../components/ArtistContractList/ArtistContractList";
import ArtistPaymentList from "../../components/ArtistPaymentList/ArtistPaymentList";
import EditIcon from "@mui/icons-material/Edit";
import foldericon from "../../../src/assets/folder.png";
import deleteicon from "../../../src/assets/delete.png";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";

const MyPayments = () => {
  const [notes, setNotes] = useState([]);
  const [openPanel, setOpenPanel] = useState(false);
  const [notesPanel, setNotesPanel] = useState();
  const [notescomments, setNotesComments] = useState([]);

  const options = [
    { value: "all", label: "All Contracts" },
    { value: "active", label: "Active Contracts" },
    { value: "archive", label: "Archived Contracts" },
  ];

  const [selected, setSelected] = useState(options[0].label);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const handleNotesOpen = (value) => {
    setNotesPanel(value);
  };

  return (
    <Container maxWidth="xxl">
      <Grid container spacing={2} className={classess.page}>
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={9}
          className={classess.page__details}
        >
          <Box
            varient="div"
            component="div"
            className={classess.page__details__box}
          >
            <Box
              varient="div"
              component="div"
              className={classess.page__details__box__tracks}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__details__box__tracks__header}
              >
                <span
                  className={
                    classess.page__details__box__adetails__header__title
                  }
                >
                  My Payments
                </span>

                <Box
                  varient="div"
                  component="div"
                  className={
                    classess.page__details__box__tracks__header__search
                  }
                >
                  <SearchIcon
                    sx={{
                      color: "#4FFCB7",
                      // position: "absolute",
                      top: "8px",
                      // right: "-3px",
                    }}
                  />
                  <input
                    className={
                      classess.page__details__box__tracks__header__search__input
                    }
                    placeholder="Search"
                    type="search"
                    // onInput={(e) => handleSearch(e)}
                    required
                  />
                </Box>
              </Box>

              <ArtistPaymentList
                handleNotes={handleNotesOpen}
                setNotesComments={setNotesComments}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item sm={2} md={3} lg={5} xl={3} className={classess.page__notes}>
          {notesPanel && (
            <Box
              varient="div"
              component="div"
              className={classess.page__notes__box}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__notes__box__tracks}
              >
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__notes__box__adetails__header}
                >
                  <span
                    className={
                      classess.page__notes__box__adetails__header__title
                    }
                  >
                    Notes
                  </span>
                  <span>
                    <Button
                      variant="contained"
                      className={
                        classess.page__notes__box__adetails__header__Editbtn
                      }
                      onClick={() => setOpenPanel(!openPanel)}
                    >
                      <EditIcon
                        fontSize="small"
                        sx={{ fontSize: "15px", color: "#000" }}
                      />
                    </Button>
                  </span>
                </Box>
                {notescomments.map((data) => {
                  return (
                    <Grid container mb={2} key={data._id}>
                      <Grid sm className={classess.page__notes__notebox}>
                        <Box className={classess.page__notes__notebox__chips}>
                          <span>
                            <Chip
                              sx={{ background: "#4FFCB7" }}
                              avatar={
                                <Avatar
                                  alt="avatar"
                                  src={data.user?.profilePicture}
                                />
                              }
                              label={
                                data.user.firstName + " " + data.user.lastName
                              }
                              variant="filled"
                            />
                          </span>
                          <span>
                            <Chip
                              sx={{ background: "#4FFCB7" }}
                              label={moment(`${data?.createdAt}`).fromNow()}
                              variant="filled"
                            />
                          </span>
                        </Box>
                        <Box
                          className={classess.page__notes__notebox__notetext}
                        >
                          <p>{data.note}</p>
                        </Box>
                      </Grid>
                      {openPanel && (
                        <Grid
                          sm={2}
                          className={classess.page__notes__noteboxControls}
                        >
                          <img src={foldericon} alt="folder" />
                          <img src={deleteicon} alt="delete" />
                        </Grid>
                      )}
                    </Grid>
                  );
                })}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyPayments;
