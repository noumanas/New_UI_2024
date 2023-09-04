import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { config as configURL } from "../../enviorment/enviorment";
import CancelIcon from "@mui/icons-material/Cancel";

const ContractSubmitPreview = forwardRef((props, ref, contract) => {
  // const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  // const [age, setAge] = useState("");
  // const [addEmail, setAddEmail] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // const removeElement = () => {
  //   setVisible((prev) => !prev);
  // };

  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setEmail(event.target.value);
  };

  const handleAddEmail = async () => {
    let e = await list.filter((e) => e.email === email);

    if (e.length > 0) {
      toast.warning("Email is already in the list.");
    } else {
      setList([...list, { email }]);
      console.log("list", list);
      setEmail("");
    }
  };

  useImperativeHandle(ref, () => ({
    async onSubmit() {
      if (list.length > 0) {
        try {
          await axios.post(`${configURL.BASE_URL}/contract-gen/send-email`, {
            recipients: list,
            artistname: props.contract?.artist_name,
            artist_representative_name:
              props.contract?.artist_representative_name,
          });
          toast.success("Email sent successfully.");
        } catch (error) {
          toast.error("Something wrong");
        }
      } else {
        toast.warning("Please add at least email");
      }
    },
  }));

  return (
    <Grid container spacing={2} className={classess.page}>
      <Grid item sm={12} lg={12} xl={12} className={classess.page__details}>
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
                className={classess.page__details__box__adetails__header__title}
              >
                Please enter email address
              </span>
            </Box>
            <form action="" className={classess.page__fieldsContainer__form}>
              <Grid container spacing={4} rowSpacing={4}>
                <Grid item md={6} xs={12}>
                  <Box
                    varient="div"
                    component="div"
                    className={classess.page__fieldsContainer__form__formfield}
                    sx={{ width: "100%" }}
                  >
                    {list &&
                      list.map((el, index) => (
                        <>
                          <Grid container spacing={2} key={index}>
                            <Grid item md={8}>
                              <input
                                className={
                                  classess.page__fieldsContainer__form__formfield__input
                                }
                                name="name"
                                placeholder="jb@blacklion.xyz"
                                type="email"
                                onChange={(e) => {
                                  let newList = list.map((obj) => {
                                    if (obj.email === el.email) {
                                      return { ...obj, email: e.target.value };
                                    }
                                    return obj;
                                  });
                                  setList(newList);
                                }}
                                value={el.email}
                                defaultValue={el.email}
                                required
                                disabled={true}
                              />
                            </Grid>
                            <Grid item md={1} sx={{ position: "relative" }}>
                              <span sx={{ position: "absolute", top: "10px" }}>
                                <CancelIcon
                                  sx={{
                                    color: "#222",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                    transform: "translateX(-50px)",
                                  }}
                                  onClick={() =>
                                    setList(
                                      list.filter(
                                        (e, selectedIndex) =>
                                          selectedIndex !== index
                                      )
                                    )
                                  }
                                />
                              </span>
                            </Grid>
                          </Grid>
                        </>
                      ))}

                    <label
                      className={
                        classess.page__fieldsContainer__form__formfield__label
                      }
                    >
                      Email address
                    </label>

                    <Grid container spacing={2}>
                      <Grid item md={8}>
                        <input
                          className={
                            classess.page__fieldsContainer__form__formfield__input
                          }
                          name="name"
                          placeholder="jb@blacklion.xyz"
                          type="email"
                          onChange={handleChange}
                          value={email}
                          required
                        />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                      </Grid>
                      <Grid item md={4}>
                        <Button
                          type="submit"
                          variant="contained"
                          component="label"
                          sx={{ height: 46 }}
                          className={
                            classess.page__fieldsContainer__form__formfield__button
                          }
                          disabled={!email.length ? true : false}
                          onClick={handleAddEmail}
                        >
                          Add Email
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
});

export default ContractSubmitPreview;
