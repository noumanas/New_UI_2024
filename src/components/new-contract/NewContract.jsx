import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import PayStepper from "../pay-stepper/PayStepper";

const NewContract = () => {
  const [isPay, setIsPay] = useState(false);

  const handlePay = () => {
    setIsPay(true);
  };

  return (
    <Container maxWidth="xxl">
      <Grid container spacing={2} className={classess.page}>
        <Grid item sm={12} lg={12} xl={8} className={classess.page__details}>
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
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={8}
                  lg={12}
                  xl={8}
                  display={"flex"}
                  justifyContent={"flex-start"}
                >
                  <ButtonGroup
                    aria-label=""
                    className={
                      classess.page__details__box__tracks__header__btn_group
                    }
                    sx={{ gap: "9px" }}
                  >
                    <Button
                      className={
                        classess.page__details__box__tracks__header__btn_group__btn
                      }
                      // sx={
                      //   collaboration && { backgroundColor: "#4FFCB7 !important" }
                      // }
                      // onClick={handleCollaboration}
                    >
                      Historical Music
                    </Button>
                    <Button
                      className={
                        classess.page__details__box__tracks__header__btn_group__btn
                      }
                      // sx={financial && { backgroundColor: "#4FFCB7 !important" }}
                      // onClick={handleFinancial}
                    >
                      New Music
                    </Button>
                    <Button
                      className={
                        classess.page__details__box__tracks__header__btn_group__btn
                      }
                      // sx={
                      //   recommendations && { backgroundColor: "#4FFCB7 !important" }
                      // }
                      // onClick={handleRecommendation}
                    >
                      Customize
                    </Button>
                    <Button
                      className={
                        classess.page__details__box__tracks__header__btn_group__btn
                      }
                      // sx={
                      //   recommendations && { backgroundColor: "#4FFCB7 !important" }
                      // }
                      // onClick={handleRecommendation}
                    >
                      Sign
                    </Button>
                    <Button
                      className={
                        classess.page__details__box__tracks__header__btn_group__btn
                      }
                      sx={isPay && { backgroundColor: "#4FFCB7 !important" }}
                      onClick={handlePay}
                    >
                      Pay
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Box>
              <Box varient="div" component="div" mt={5}>
                {isPay && <PayStepper />}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewContract;
