import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ArtistContractList from "../../components/ArtistContractList/ArtistContractList";
import SearchIcon from "@mui/icons-material/Search";

const MyContracts = () => {
  const options = [
    { value: "all", label: "All Contracts" },
    { value: "active", label: "Active Contracts" },
    { value: "archive", label: "Archived Contracts" },
  ];

  const [selected, setSelected] = useState(options[0].label);

  const handleChange = (event) => {
    setSelected(event.target.value);
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
                  My Contracts
                </span>

                <Box
                  varient="div"
                  component="div"
                  className={
                    classess.page__details__box__adetails__header__search
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
                      classess.page__details__box__adetails__header__search__input
                    }
                    placeholder="Search"
                    type="search"
                    // onInput={(e) => handleSearch(e)}
                    required
                  />
                </Box>
              </Box>

              <ArtistContractList />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyContracts;
