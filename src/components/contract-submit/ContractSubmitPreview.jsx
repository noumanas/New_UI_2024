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
import { FormControl, ListItemText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const ContractSubmitPreview = forwardRef((props, ref, contract) => {
  // const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [personName, setPersonName] = useState([]);

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
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const getEmailFromName = (name) => {
    const foundItem = data.find((item) => item.name === name);
    return foundItem ? foundItem.email : "";
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

  // const handleAddEmail = async () => {
  //   // let e = await list.filter((e) => e.email === email);

  //   // if (e.length > 0) {
  //   //   toast.warning("Email is already in the list.");
  //   // } else {
  //   //   setList([...list, { email }]);
  //   //   console.log("list", list);
  //   //   setEmail("");
  //   // }

  //   let emailarray = [];
  //   for (let i = 0; i < personName.length; i++) {
  //     const email = getEmailFromName(personName[i]);
  //     const emailObj = {
  //       email: email,
  //     };
  //     emailarray.push(emailObj);
  //   }
  //   // props?.setList(emailarray);
  //   setList(email);

  //   // setEmail("");
  // };
  const handleAddEmail = async () => {
    let emailArray = [];

    for (let i = 0; i < personName.length; i++) {
      const name = personName[i];
      const email = getEmailFromName(name); // Assuming you have a function getEmailFromName to get the email from a name
      const emailObj = {
        name: name,
        email: email,
      };
      emailArray.push(emailObj);
    }

    setList(emailArray);
    // setPersonName([]);
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
                    {list.map((el, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item md={8}>
                          <input
                            className={
                              classess.page__fieldsContainer__form__formfield__input
                            }
                            name="name"
                            placeholder={el.name}
                            type="email"
                            onChange={(e) => {
                              // Update the email in the list
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
                          <span>
                            <CancelIcon
                              sx={{
                                color: "#4ffcb7",
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
                    ))}

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
                          {console.log(personName)}
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
                              height: "40px",

                              border: "2px solid #4ffcb7",
                              padding: "0",
                              svg: {
                                fill: "#4ffcb7 !important",
                              },
                            }}
                          >
                            {data.map((item, index) => (
                              <MenuItem
                                key={index}
                                value={item.name}
                                className={
                                  classess.page__fieldsContainer__form__list
                                }
                              >
                                <Checkbox
                                  checked={personName.indexOf(item.name) > -1}
                                  sx={{
                                    color: "#4ffcb7",
                                    marginRight: "5px",
                                    svg: {
                                      color: "#4ffcb7",
                                    },
                                  }}
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
                        >
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                    {/* <Grid container spacing={2}>
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
                    </Grid> */}
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
