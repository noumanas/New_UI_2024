import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import { toast } from "react-toastify";
import { config as configURL } from "../../enviorment/enviorment";
import axios from "axios";

const PaymentSubmit = forwardRef(
  (props, ref, formData, setGetNumber, setList, list) => {
    const [email, setEmail] = useState("");

    const [addEmail, setAddEmail] = useState(false);
    const [personName, setPersonName] = useState([]);
    const data = [
      {
        name: "Finance",
        email: "finance@blacklionapp.xyz",
      },
      {
        name: "Legal",
        email: "nouman@blacklionapp.xyz",
      },
      {
        name: "Management",
        email: "management@blacklionapp.xyz",
      },
      {
        name: "CEO",
        email: "ceo@blacklionapp.xyz ",
      },
    ];
    const getEmailFromName = (name) => {
      const foundItem = data.find((item) => item.name === name);
      return foundItem ? foundItem.email : "";
    };
    const handleAddEmail = () => {
      // setAddEmail('true')
      let emailarray = [];
      for (let i = 0; i < personName.length; i++) {
        const email = getEmailFromName(personName[i]);
        const emailObj = {
          email: email,
        };
        emailarray.push(emailObj);
      }
      props?.setList(emailarray);
      setEmail("");
    };

    const handleRemoveEmail = (e) => {
      const email = e.target.getAttribute("email");
      props?.setList(props.list.filter((item) => item.email !== email));
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    useImperativeHandle(ref, () => ({
      async onSubmit() {
        console.log("testing");
        if (props?.list.length > 0) {
          try {
            await axios.post(
              `${configURL.BASE_URL}/contract-gen/send-email/payment`,
              {
                recipients: props.list,
                artistname: props.formData?.artist_name,
                artist_representative_name: props.formData?.created_by,
              }
            );
            toast.success("Email sent successfully.");
          } catch (error) {
            toast.error("Something wrong");
          }
        } else {
          toast.warning("Please add at least email");
        }
      },
    }));

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };

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
                  className={
                    classess.page__details__box__adetails__header__title
                  }
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
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      {props.list &&
                        props.list.map((el, index1) => (
                          <>
                            <Grid container spacing={2}>
                              <Grid item md={8}>
                                <input
                                  className={
                                    classess.page__fieldsContainer__form__formfield__input
                                  }
                                  name="name"
                                  placeholder="jb@blacklion.xyz"
                                  type="email"
                                  required
                                  value={el.email}
                                  defaultValue={el.email}
                                  disabled={true}
                                  onChange={(e) => {
                                    let newList = props.list.map((obj) => {
                                      if (obj.email === el.email) {
                                        return {
                                          ...obj,
                                          email: e.target.value,
                                        };
                                      }
                                      return obj;
                                    });
                                    setList(newList);
                                  }}
                                />
                              </Grid>
                              <Grid item md={1} sx={{ position: "relative" }}>
                                <span
                                  sx={{ position: "absolute", top: "10px" }}
                                >
                                  <CancelIcon
                                    email={el.email}
                                    onClick={handleRemoveEmail}
                                    className={
                                      classess.page__fieldsContainer__form__formfield__remove
                                    }
                                    // sx={{color: '#222',cursor: 'pointer',marginTop: '12px', transform: 'translateX(-50px)'}}
                                  />
                                </span>
                              </Grid>
                            </Grid>
                          </>
                        ))}
                      {/* {
                  addEmail &&
                  <>
                    <Grid container spacing={2}>
                    <Grid item md={8}>
                    <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="jb@blacklion.xyz"
                      type="email"
                      required
                    />
                    </Grid>
                    <Grid item md={1} sx={{position: 'relative'}}>
                      <span sx={{position: 'absolute', top: '10px'}}>
                        <CancelIcon
                          sx={{color: '#222',cursor: 'pointer',marginTop: '10px', transform: 'translateX(-50px)'}}
                          onClick={() => {setAddEmail(!addEmail)}}
                        />
                      </span>
                    </Grid>
                    </Grid>
                  </>
                  } */}
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Email address
                      </label>
                      <Grid container spacing={2}>
                        <Grid item md={8} style={{ paddingTop: "10px" }}>
                          <FormControl sx={{ m: 1, width: "100%" }}>
                            {/* <InputLabel id="demo-multiple-checkbox-label">Select Recipients</InputLabel> */}
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              value={personName}
                              onChange={handleChange}
                              //  input={<OutlinedInput label="Select Recipients" style={{borderColor: '#fff'}} />}
                              renderValue={(selected) => selected.join(", ")}
                              MenuProps={MenuProps}
                              sx={{
                                backgroundColor: "#192233",
                                borderRadius: "10px",
                                height: 46,
                                border: "2px solid #4ffcb7",
                              }}
                            >
                              {data.map((item) => (
                                <MenuItem
                                  key={item.name}
                                  value={item.name}
                                  className={
                                    classess.page__fieldsContainer__form__list
                                  }
                                >
                                  <Checkbox
                                    checked={personName.indexOf(item.name) > -1}
                                    sx={{ color: "#fff", marginRight: "5px" }}
                                  />
                                  <ListItemText
                                    primary={item.name}
                                    secondary={item.email}
                                    sx={{ padding: "0px" }}
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {/* <input
                      className={
                        classess.page__fieldsContainer__form__formfield__input
                      }
                      name="name"
                      placeholder="jb@blacklion.xyz"
                      type="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    /> */}
                        </Grid>
                        <Grid item md={4} style={{ paddingTop: "17px" }}>
                          <Button
                            variant="contained"
                            component="label"
                            sx={{ height: 46 }}
                            className={
                              classess.page__fieldsContainer__form__formfield__button
                            }
                            type="submit"
                            onClick={handleAddEmail}
                            // disabled={!email.length ? true : false}
                          >
                            Add
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
  }
);

export default PaymentSubmit;
