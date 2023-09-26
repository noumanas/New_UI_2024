import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import classess from "./style.module.scss";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { config as URLconfig } from "../../enviorment/enviorment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const PaymentDetails = React.forwardRef((props, ref) => {
  const artist = useSelector((state) => state.artist.artist);
  const user = useSelector((state) => state.auth.user);
  const totalFunding = useSelector((state) => state.artist.totalFunding);
  const [age, setAge] = useState("");
  const [BankName, setBankName] = useState("");
  const [BankNameError, setBankNameError] = useState("");
  const [BankHolderName, setBankHolderName] = useState("");
  const [BankHolderNameError, setBankHolderNameError] = useState("");
  const [BankAccountNumber, setBankAccountNumber] = useState("");
  const [BankAccountNumberError, setBankAccountNumberError] = useState("");

  const [Routing, setRouting] = useState("");
  const [SwiftOrBICCode, setSwiftOrBICCode] = useState("");
  const [Iban, setIban] = useState("");
  const [BankAddress, setBankAddress] = useState("");
  const [City, setCity] = useState("");
  const [Zip, setZip] = useState("");
  const [State, setState] = useState("");
  const [Street, setStreet] = useState("");
  const [Country, setCountry] = useState("");
  const [W8BENFile, setW8BENFile] = useState("");
  const [ArtistPhotoIDFront, setArtistPhotoIDFront] = useState("");
  const [ArtistPhotoIDBack, setArtistPhotoIDBack] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const bankApiCall = async (routing_no) => {
    setRouting(routing_no);

    // Check if routing value's length is greater than 5
    if (routing_no.length == 9) {
      const options = {
        method: "GET",
        url: `${URLconfig.BASE_URL}/bankinfo/${routing_no}`,
      };
      try {
        const response = await axios.request(options);
        setRouting(routing_no);
        setBankAddress(response.data.data[0].data.addressFull);
        setCity(response.data.data[0].data.city);
        setBankName(response.data.data[0].data.name);
        setState(response.data.data[0].data.state);
        setStreet(response.data.data[0].data.street);
        setZip(response.data.data[0].data.zip);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const ibanbankinfoApi = async (iban_no) => {
    const options = {
      headers: {
        Accept: "application/json",
        "X-Api-Key":
          "sk_4ce40d42cfb1290c96fca9c8c66d4507f8ef8f1bf753e116c8fc6ddbbd4f460f",
      },
    };
    try {
      const response = await axios.get(
        `https://swiftcodesapi.com/v1/ibans/${iban_no}`,
        options
      );
      console.log("res", response.data.data);
      setIsDisabled(true);
      setIban(iban_no);
      setBankAccountNumber(response?.data?.data?.account_number);
      setBankAddress(response?.data?.data?.swift?.address);
      setCity(response?.data?.data?.swift?.city.name);
      setBankName(response?.data?.data?.swift?.bank.name);
      setSwiftOrBICCode(response?.data?.data?.swift?.id);
      setZip(response?.data?.data?.swift?.postcode);

      setCountry(response?.data?.data?.swift?.country.name);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setBankName(props.backDataSending.bank_name);
    setBankHolderName(props.backDataSending.bank_holder_name);
    setBankAccountNumber(props.backDataSending.bank_account_number);
    setRouting(props.backDataSending.routing_number);
    setBankAddress(props.backDataSending.bank_address);
    setCity(props.backDataSending.city);
    setState(props.backDataSending.state);
    setStreet(props.backDataSending.street);
    setZip(props.backDataSending.zip);
    setCountry(props.backDataSending.country);
    setIban(props.backDataSending.iban);
    setSwiftOrBICCode(props.backDataSending.swift_or_BIC_code);
  }, []);
  React.useImperativeHandle(ref, () => ({
    async onSubmit() {
      try {
        if (W8BENFile) {
          if (ArtistPhotoIDFront) {
            if (ArtistPhotoIDBack) {
              if (BankName) {
                if (BankHolderName) {
                  if (BankAccountNumber) {
                    props.setGetNumber(1);
                    const formdata = new FormData();
                    formdata.append("bank_name", BankName);
                    formdata.append("artist_id", artist?._id);
                    formdata.append("bank_holder_name", BankHolderName);
                    formdata.append("bank_account_number", BankAccountNumber);
                    formdata.append("routing_number", Routing);
                    formdata.append("swift_or_BIC_code", SwiftOrBICCode);
                    formdata.append("bank_address", BankAddress);
                    formdata.append("city", City);
                    formdata.append("zip", Zip);
                    formdata.append("country", Country);
                    formdata.append("iban", Iban);

                    formdata.append("w8_ben_file", W8BENFile);
                    formdata.append(
                      "artist_photo_id_front",
                      ArtistPhotoIDFront
                    );
                    formdata.append("artist_photo_id_back", ArtistPhotoIDBack);
                    formdata.append("valuation", totalFunding);
                    formdata.append("artist_advance", "");
                    formdata.append("artist_marketing_budget", "");
                    formdata.append(
                      "created_by",
                      `${user?.firstName} ${user?.lastName}`
                    );
                    formdata.append("artist_name", artist?.name);

                    props.setPaymentDetail(formdata);
                    props.setFormData((prevFormData) => ({
                      ...prevFormData,
                      bank_name: BankName,
                      artist_id: artist?._id,
                      bank_holder_name: BankHolderName,
                      bank_account_number: BankAccountNumber,
                      routing_number: Routing,
                      swift_or_BIC_code: SwiftOrBICCode,
                      bank_address: BankAddress,
                      city: City,
                      zip: Zip,
                      iban: Iban,
                      country: Country,
                      w8_ben_file: W8BENFile,
                      artist_photo_id_front: ArtistPhotoIDFront,
                      artist_photo_id_back: ArtistPhotoIDBack,
                      valuation: totalFunding,
                      artist_advance: "",
                      artist_marketing_budget: "",
                      Selected_tracks: [],
                      created_by: `${user?.firstName} ${user?.lastName}`,
                      artist_name: artist?.name,
                    }));
                  } else {
                    props.setGetNumber(0);
                    setBankAccountNumberError("Please insert Bank Number");
                    setBankHolderNameError(" ");
                  }
                } else {
                  props.setGetNumber(0);
                  setBankHolderNameError("Please insert Bank Holder Name");
                  setBankNameError(" ");
                }
              } else {
                props.setGetNumber(0);
                setBankNameError("Please insert Bank name");
              }
            } else {
              props.setGetNumber(0);
              toast.error("Please add ID Card Back");
            }
          } else {
            props.setGetNumber(0);
            toast.error("Please add ID Card Front");
          }
        } else {
          props.setGetNumber(0);
          toast.error("Please add w8-Ben");
        }
      } catch (e) {
        console.log(e);
        toast.error(`${e}`);
      }
    },
  }));

  return (
    <>
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
                  Please Enter Payment Details
                </span>
              </Box>
              <form action="" className={classess.page__fieldsContainer__form}>
                <Grid container spacing={4} rowSpacing={4}>
                  <Grid item md={4} xs={14}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Routing #
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="name"
                        placeholder="1234567"
                        type="number"
                        // max={1234}
                        value={Routing}
                        disabled={isDisabled}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue.length <= 9) {
                            setRouting(inputValue);
                            bankApiCall(inputValue);
                          }
                        }}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        SWIFT/BIC Code
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="name"
                        placeholder="SWIFT4T32"
                        type="text"
                        maxLength={13}
                        value={SwiftOrBICCode}
                        onChange={(e) => setSwiftOrBICCode(e.target.value)}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        IBAN<sub>(if applicable)</sub>
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="phone"
                        placeholder="FR1420041010050500013M02606"
                        type="text"
                        value={Iban}
                        maxLength={25}
                        onChange={(e) => ibanbankinfoApi(e.target.value)}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Bank Name
                        <sup
                          style={{
                            color: "red",
                            marginLeft: "-5px",
                            fontSize: "1.1rem",
                          }}
                        >
                          *
                        </sup>
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="name"
                        value={BankName}
                        placeholder="Bank of America"
                        type="text"
                        onChange={(e) => setBankName(e.target.value)}
                        required
                      />
                    </Box>
                    {BankNameError && (
                      <div style={{ color: "red" }}>{BankNameError}</div>
                    )}
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Account Holder's Name
                        <sup
                          style={{
                            color: "red",
                            marginLeft: "-5px",
                            fontSize: "1.1rem",
                          }}
                        >
                          *
                        </sup>
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="name"
                        value={BankHolderName}
                        placeholder="Justin Beiber"
                        type="text"
                        onChange={(e) => setBankHolderName(e.target.value)}
                        required
                      />
                    </Box>
                    {BankHolderNameError && (
                      <div style={{ color: "red" }}>{BankHolderNameError}</div>
                    )}
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Bank Account Number
                        <sup
                          style={{
                            color: "red",
                            marginLeft: "-5px",
                            fontSize: "1.1rem",
                          }}
                        >
                          *
                        </sup>
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="name"
                        placeholder="1234567890"
                        type="number"
                        value={BankAccountNumber}
                        maxLength={14}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue.length <= 17) {
                            setBankAccountNumber(inputValue);
                          }
                        }}
                        required
                      />
                    </Box>
                    {BankAccountNumberError && (
                      <div style={{ color: "red" }}>
                        {BankAccountNumberError}
                      </div>
                    )}
                  </Grid>

                  <Grid item md={8} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Bank Address
                      </label>

                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="phone"
                        value={BankAddress}
                        placeholder="123 Blacklion Avenue"
                        type="text"
                        onChange={(e) => setBankAddress(e.target.value)}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        City
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        value={City}
                        name="name"
                        placeholder="Atlanta"
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Zip/Postal Code
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        value={Zip}
                        name="name"
                        placeholder="12345"
                        type="email"
                        onChange={(e) => setZip(e.target.value)}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Country
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="phone"
                        placeholder="United States"
                        value={Country}
                        type="text"
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}></Grid>
                  <Grid item md={4} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Upload W9 or W8-BEN
                        <sup
                          style={{
                            color: "red",
                            marginLeft: "-5px",
                            fontSize: "1.1rem",
                          }}
                        >
                          *
                        </sup>
                      </label>
                      <Button
                        variant="contained"
                        component="label"
                        className={
                          classess.page__fieldsContainer__form__formfield__button
                        }
                      >
                        <span>
                          <UploadFileIcon
                            className={
                              classess.page__fieldsContainer__form__formfield__button__upload
                            }
                          />
                        </span>{" "}
                        Drag & Drop files here
                        <input
                          hidden
                          accept="pdf/*"
                          multiple
                          type="file"
                          onChange={(e) => setW8BENFile(e.target.files[0])}
                        />
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Copy of Artist's Photo ID
                        <sup
                          style={{
                            color: "red",
                            marginLeft: "-5px",
                            fontSize: "1.1rem",
                          }}
                        >
                          *
                        </sup>
                        <small>(Front)</small>
                      </label>
                      <Button
                        variant="contained"
                        component="label"
                        className={
                          classess.page__fieldsContainer__form__formfield__button
                        }
                      >
                        <span>
                          <UploadFileIcon
                            className={
                              classess.page__fieldsContainer__form__formfield__button__upload
                            }
                          />
                        </span>{" "}
                        Drag & Drop files here
                        <input
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          onChange={(e) =>
                            setArtistPhotoIDFront(e.target.files[0])
                          }
                        />
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__fieldsContainer__form__formfield
                      }
                      sx={{ width: "100%" }}
                    >
                      <label
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        Copy of Artist's Photo ID
                        <sup
                          style={{
                            color: "red",
                            marginLeft: "-5px",
                            fontSize: "1.1rem",
                          }}
                        >
                          *
                        </sup>
                        <small>(Back)</small>
                      </label>
                      <Button
                        variant="contained"
                        component="label"
                        className={
                          classess.page__fieldsContainer__form__formfield__button
                        }
                      >
                        <span>
                          <UploadFileIcon
                            className={
                              classess.page__fieldsContainer__form__formfield__button__upload
                            }
                          />
                        </span>{" "}
                        Drag & Drop files here
                        <input
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          onChange={(e) =>
                            setArtistPhotoIDBack(e.target.files[0])
                          }
                        />
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
});

export default PaymentDetails;
