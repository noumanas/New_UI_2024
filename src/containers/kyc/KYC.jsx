import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ArtistContractList from "../../components/ArtistContractList/ArtistContractList";
import KYCList from "../../components/KYCList/KYCList";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const KYC = () => {
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
              className={classess.page__details__box__adetails}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__details__box__adetails__header}
              >
                <Box>
                  <span
                    className={
                      classess.page__details__box__adetails__header__title
                    }
                  >
                    Verification Portal
                  </span>
                </Box>
                <Box
                  className={
                    classess.page__details__box__adetails__header__textinput_container
                  }
                >
                  {/* <IconButton> */}
                  <SearchIcon
                    className={
                      classess.page__details__box__adetails__header__textinput_container__icon_color
                    }
                  />
                  {/* </IconButton> */}

                  <input
                    className={
                      classess.page__details__box__adetails__header__textinput_container__input
                    }
                    placeholder="Search"
                  />
                </Box>
              </Box>
              <Box
                varient="div"
                component="div"
                className={classess.page__details__box__adetails__main_content}
              >
                <KYCList />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default KYC;
