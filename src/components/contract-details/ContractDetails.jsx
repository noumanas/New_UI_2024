import { React, useEffect } from "react";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import { config as URLConfig } from "../../enviorment/enviorment";
import { useDispatch, useSelector } from "react-redux";
import useGooglePlaceAutoComplete from "../../services/google_place_autocomplete";
import PhoneInput from "react-phone-number-input";

const ContractDetails = forwardRef(
  (props, ref, setContractData, setGetNumber,backDataSending) => {
    const address1Ref = useRef();
    const googleAutoCompleteSvc = useGooglePlaceAutoComplete();
    let autoComplete = "";
    const artist = useSelector((state) => state.artist.artist);
    const user = useSelector((state) => state.auth.user);
    const [email, setEmail] = useState("");
    const [errorLegal, setLegalError] = useState(null);
    const [errorCity, setCityError] = useState(null);
    const [errorCountry, setCountryError] = useState(null);
    const [legelName, setLegelName] = useState("");
    const [artistName, setArtistName] = useState("");

    const [artistRepresentativeName, setArtistRepresentativeName] =
      useState("");
    const [artistEmail, setArtistEmail] = useState("");
    const [artistphone, setArtistPhone] = useState("");
    const [artistPhoneError, setArtistPhoneError] = useState("");
    const [artistEmailError, setArtistEmailError] = useState("");

    const [artistRepresentativeEmail, setArtistRepresentativeEmail] =
      useState("");
    const [advance, setAdvance] = useState("");
    const [advanceAmount, setAdvanceAmount] = useState("");
    const [errorAdvance, setAdvanceError] = useState("")
    const [agreement, setAgreement] = useState("");
    const [recipientAddress, setRecipientAddress] = useState("");
    const [recipientAddressError, setRecipientAddressError] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [zipCodeError, setZipCodeError] = useState("");
    const [country, setCountry] = useState("");

    const handleAddressSelect = async () => {
      let addressObj = await googleAutoCompleteSvc.getFullAddress(autoComplete);
      address1Ref.current.value = addressObj.address1;
      setZipCode(addressObj.postalCode);
      setRecipientAddress(addressObj.address1);
      setCountry(addressObj.countryLong);
      setCity(addressObj.locality);
    };

    useEffect(() => {
      setRecipientAddress(props.backDataSending.recipient_address)
      setLegelName(props.backDataSending.legel_name);
      setCity(props.backDataSending.city);
      setZipCode(props.backDataSending.zip_code);
      setCountry(props.backDataSending.country);
      setArtistPhone(props.backDataSending.artist_phone);
      setArtistEmail(props.backDataSending.artist_email);
      async function loadGoogleMaps() {
        // initialize the Google Place Autocomplete widget and bind it to an input element.
        // eslint-disable-next-line
        autoComplete = await googleAutoCompleteSvc.initAutoComplete(
          address1Ref.current,
          handleAddressSelect
        );
      }
      loadGoogleMaps();
    }, []);

    const re = /^[A-Za-z ]+$/;
    var numReg = /^\d+$/;

    const handleLegalName = (e) => {
      if (e.target.value === "") {
        setLegalError(null);
        setLegelName(e.target.value);
      } else {
        setLegalError(null);
      }
      setLegelName(e.target.value);
    };
    const handleAddress = (e) => {
        setRecipientAddress(e.target.value);
      
    };

    const handleCity = (e) => {
      if (e.target.value === "" || re.test(e.target.value)) {
        setCityError(null);
        setCity(e.target.value);
      } else {
        setCityError("Use Alphabets Only");
      }
      setCity(e.target.value);
    };

    const handleZipCode = (e) => {
      // if (e.target.value === "" || numReg.test(e.target.value)) {
      //   setZipCodeError(null);
      //   setZipCode(e.target.value);
      // } else {
      //   setZipCodeError("Use Number Only");
      // }
      setZipCode(e.target.value);
    };

    const handleAdvance = (e) => {
      setAdvanceAmount(e.target.value)
    }

    const handlePhoneNumber = (e) => {
      // if (e.target.value === "" || numReg.test(e.target.value)) {
      //   setArtistPhoneError(null);
      //   setArtistPhone(e.target.value);
      // } else {
      //   setArtistPhoneError("Use Number Only");a
      // }
      setArtistPhone(e.target.value);
    };

    const handleCountry = (e) => {
      if (e.target.value === "" || re.test(e.target.value)) {
        setCountryError(null);
        setCountry(e.target.value);
      } else {
        setCountryError("Use Alphabets Only");
      }
      setCountry(e.target.value);
    };

    const handleRecipientAddress = (e) => {
      // if (e.target.value === "" || re.test(e.target.value)) {
      //   setRecipientAddressError(null);
      //   setRecipientAddress(e.target.value);
      // } else {
      //   setRecipientAddressError(null);
      // }
      setRecipientAddress(e.target.value);
    };

    useImperativeHandle(ref, () => ({
      async onSubmit() {
        try {
          if (agreement) {
            if (!legelName) {
              props.setGetNumber(0);
              setLegalError("Enter Legal Name");
            }
            if (!artistphone) {
              props.setGetNumber(0);
              setArtistPhoneError("Enter Phone Number");
            }
            if (!city) {
              props.setGetNumber(0);
              setCityError("Enter City Name");
            }
            if (!zipCode) {
              props.setGetNumber(0);
              setZipCodeError("Enter Zip Code");
            }
            if (!country) {
              props.setGetNumber(0);
              setCountryError("Enter Country Name");
            }
            if (!recipientAddress) {
              props.setGetNumber(0);
              setRecipientAddressError("Enter Recipient Address");
            } else {
              props.setGetNumber(1);
              const formdata = new FormData();
              formdata.append("legel_name", legelName);
              formdata.append("artist_name", artistName);
              formdata.append("artist_id", artist?._id);
              formdata.append(
                "artist_representative_name",
                artistRepresentativeName
              );
              formdata.append("artist_email", artistEmail);
              formdata.append("artist_phone", artistphone);
              formdata.append(
                "artist_representative_email",
                artistRepresentativeEmail
              );
              formdata.append("advance", advance);
              formdata.append("advance_amount", advanceAmount);
              formdata.append("agreement", agreement);
              formdata.append("recipient_address", recipientAddress);
              formdata.append("city", city);
              formdata.append("zip_code", zipCode);
              formdata.append("country", country);
              formdata.append("Selected_tracks", props.selected_tracts);
              formdata.append("contract_length", props.contract_length);
              
              // const res = await fetch(`${URLConfig.BASE_URL}/contracts`, {
              //   method: "POST",
              //   body: formdata,
              // });
              const payload = {
                legel_name: formdata.get('legel_name'),
                artist_id: formdata.get('artist_id'),
                artist_name: formdata.get('artist_name'),
                artist_representative_name: formdata.get('artist_representative_name'),
                artist_email: formdata.get('artist_email'),
                artist_phone: formdata.get('artist_phone'),
                artist_representative_email: formdata.get('artist_representative_email'),
                advance: formdata.get('advance'),
                advance_amount: formdata.get('advance_amount'),
                recipient_address: formdata.get('recipient_address'),
                city:formdata.get('city'),
                zip_code: formdata.get('zip_code'),
                country:formdata.get('country'),
                Selected_tracks: formdata.get('Selected_tracks'),
                contract_length: formdata.get('contract_length'),
              };
              props.setContractData(payload);
              // const data = await res.json();
              // if (res.status == 200) {
              //   toast.success(`${data.message}`);
              // } else {
              //   toast.error(`${data.message}`);
              // }
            }
          } else {
            if (!advanceAmount) {
              props.setGetNumber(0);
              setAdvanceError("Required");
            }
            if (!legelName) {
              props.setGetNumber(0);
              setLegalError("Enter Legal name");
              
            }
            if(!artistEmail || artistEmail.trim()==''){
              props.setGetNumber(0);
              setArtistEmailError("Enter Artist Email");
            }
            if (!artistphone) {
              props.setGetNumber(0);
              setArtistPhoneError("Enter Phone Number");
            }
            if (!city) {
              props.setGetNumber(0);
              setCityError("Enter City Name");
            }
            if (!zipCode) {
              props.setGetNumber(0);
              setZipCodeError("Enter Zip Code");
            }
            if (!country) {
              props.setGetNumber(0);
              setCountryError("Enter Country Name");
            }

            if (recipientAddress && legelName?.length === 0) {
              props.setGetNumber(0);
              setRecipientAddressError("Enter Legal Name");
            }
            if (!recipientAddress) {
              props.setGetNumber(0);
              setRecipientAddressError("Enter Recipient Address");
            } else {
              props.setGetNumber(1);
              props.setFormData((prevFormData) => ({
                ...prevFormData,
                legel_name: legelName,
                artist_id: artist?._id,
                artist_name: artistName,
                artist_representative_name: artistRepresentativeName,
                artist_email: artistEmail,
                artist_phone: artistphone,
                artist_representative_email: artistRepresentativeEmail,
                advance,
                advance_amount: advanceAmount,
                recipient_address: recipientAddress,
                city,
                zip_code: zipCode,
                country,
                Selected_tracks: props.selected_tracts,
                contract_length: props.contract_length,
              }))
              const payload = {
                legel_name: legelName,
                artist_id: artist?._id,
                artist_name: artistName,
                artist_representative_name: artistRepresentativeName,
                artist_email: artistEmail,
                artist_phone: artistphone,
                artist_representative_email: artistRepresentativeEmail,
                advance,
                advance_amount: advanceAmount,
                recipient_address: recipientAddress,
                city,
                zip_code: zipCode,
                country,
                Selected_tracks: props.selected_tracts,
                contract_length: props.contract_length,
              };
              props.setContractData(payload);
             
            }
          }
        } catch (e) {
          console.log(e);
          toast.error(`${e}`);
        }
      },
    }));

    useEffect(() => {
      setArtistName(artist?.name);
      
      if(artist?.email){
        setArtistEmail(artist?.email);
      }
      else{
        setArtistEmail(props.backDataSending.artist_email);
      }
      if(artist?.telephone){
        setArtistPhone(artist?.telephone);
      }
      else{
        setArtistPhone(props.backDataSending.artist_phone);
      }
      
      setArtistRepresentativeName(user?.firstName +' '+ user?.lastName);
      setArtistRepresentativeEmail(user?.email);
      setRecipientAddress(props.backDataSending.recipient_address)
      setLegelName(props.backDataSending.legel_name);
      setCity(props.backDataSending.city);
      setZipCode(props.backDataSending.zip_code);
      setCountry(props.backDataSending.country);
      
      
    }, [artist, user]);

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
                  Please enter a few Basic Details
                </span>
              </Box>
              <form action="" className={classess.page__fieldsContainer__form}>
                <Grid container spacing={4} rowSpacing={4}>
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
                        sx={{ justifyContent: "space-between" }}
                        className={
                          classess.page__fieldsContainer__form__formfield__label
                        }
                      >
                        <span>Legal Name{" "}<span style={{color: 'red', marginLeft: '5px', fontSize: '1.1rem'}}>*</span></span>
                        <span style={{ position: "relative" }}>
                          As Mentioned in ID
                        </span>
                      </label>

                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="legel_name"
                        placeholder="Legal Name"
                        type="text"
                        value={legelName}
                        // onChange={(e) => setLegelName(e.target.value)}
                        onChange={handleLegalName}
                        required={true}
                      />
                      {errorLegal && (
                        <p
                          style={{
                            color: "red",
                            fontSize: 13,
                            margin: "3px 0px",
                          }}
                        >
                          {errorLegal}
                        </p>
                      )}
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
                       
                        <span>Artist's Name{" "}<span style={{color: 'red', marginLeft: '5px', fontSize: '1.1rem'}}>*</span></span>
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="artist_name"
                        placeholder="Artist's Name"
                        type="text"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        disabled={true}
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
                       
                        <span>Artist's Representative Name{" "}<span style={{color: 'red', marginLeft: '5px', fontSize: '1.1rem'}}>*</span></span>
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="artist_representative_name"
                        placeholder="Artist's Representative Name"
                        type="text"
                        value={artistRepresentativeName}
                        onChange={(e) =>
                          setArtistRepresentativeName(e.target.value)
                        }
                        disabled={true}
                        required={true}
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
                        
                        <span>Artist's Email{" "}<span style={{color: 'red', marginLeft: '5px', fontSize: '1.1rem'}}>*</span></span>
                        
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="artist_email"
                        placeholder="Artist's Email"
                        type="email"
                        value={artistEmail}
                        onChange={(e) => setArtistEmail(e.target.value)}
                        required={true}
                      />
                      {artistEmailError && (
                        <p
                          style={{
                            color: "red",
                            fontSize: 13,
                            margin: "3px 0px",
                          }}
                        >
                          {artistEmailError}
                        </p>
                      )}
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
                        
                        <span>Artist's Phone Number{" "}<span style={{color: 'red', marginLeft: '5px', fontSize: '1.1rem'}}>*</span></span>
                      </label>

                      <PhoneInput
                        international
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        defaultCountry="US"
                        placeholder="Enter phone number"
                        value={artistphone}
                        onChange={(e) => setArtistPhone(e)}
                        autoComplete="off"
                        required={true}
                      />

                      {artistPhoneError && (
                        <p
                          style={{
                            color: "red",
                            fontSize: 13,
                            margin: "3px 0px",
                          }}
                        >
                          {artistPhoneError}
                        </p>
                      )}
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
                        
                        <span>Artist's Representative Email{" "}<span style={{color: 'red', marginLeft: '5px', fontSize: '1.1rem'}}>*</span></span>
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="artist_representative_email"
                        placeholder="Artist's Representative Email"
                        type="email"
                        value={artistRepresentativeEmail}
                        onChange={(e) =>
                          setArtistRepresentativeEmail(e.target.value)
                        }
                        required={true}
                      />
                    </Box>
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
                        Do you have an advance on these tracks with any other
                        partner?
                      </label>

                      <Select
                        value={advance}
                        onChange={(e) => setAdvance(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className={
                          classess.page__fieldsContainer__form__formfield__select
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"YES"}>Yes</MenuItem>
                        <MenuItem value={"NO"}>No</MenuItem>
                      </Select>
                    </Box>
                  </Grid>
                  {advance === "YES" && (
                    <Grid item md={4} xs={12}>
                      <Box
                        varient="div"
                        component="div"
                        className={
                          classess.page__fieldsContainer__form__formfield
                        }
                        sx={{ width: "100%", position: "relative" }}
                      >
                        <label
                          className={
                            classess.page__fieldsContainer__form__formfield__label
                          }
                        >
                           <span>Please Enter Advance Amount{" "}<span style={{color: 'red', marginLeft: '5px', fontSize: '1.1rem'}}>*</span></span>
                        </label>
                        <Box
                          variant="span"
                          className={
                            classess.page__fieldsContainer__form__formfield__dollar
                          }
                        >
                          $
                        </Box>
                        <input
                          style={{ paddingLeft: "50px" }}
                          className={
                            classess.page__fieldsContainer__form__formfield__input
                          }
                          name="advance_amount"
                          placeholder="Advance Amount"
                          type="number"
                          onChange={handleAdvance}
                          // onChange={(e) => setAdvanceAmount(e.target.value)}
                          required={true}
                          // required={false}
                        />
                       
                      </Box>
                      {errorAdvance && (
                        <p
                          style={{
                            color: "red",
                            fontSize: 13,
                            marginTop: "15px",
                          }}
                        >
                          {errorAdvance}
                        </p>
                      )}
                    </Grid>
                  )}

                  <Grid item xs={12} md={12}>
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
                        
                        <span>Upload Distribution Agreement{" "}</span>
                      </label>
                      {advance === "YES" ? ( 
                        <>
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
                        Drag & Drop files here or click to select files
                        <input
                          name="agreement"
                          hidden
                          accept="application/msword, application/pdf"
                          multiple
                          type="file"
                          onChange={(e) => setAgreement(e.target.files[0])}
                          required={true}
                        />
                      </Button>
                      </>
                      ) : (
                        <>
                        <Button
                        variant="contained"
                        component="label"
                        disabled={true}
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
                        Drag & Drop files here or click to select files
                        <input
                          name="agreement"
                          hidden
                          accept="application/msword, application/pdf"
                          multiple
                          type="file"
                          onChange={(e) => setAgreement(e.target.files[0])}
                          required={true}
                        />
                      </Button>
                      </>
                      )}
                    </Box>
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
                        
                        <span>Recipient Address{" "}<span style={{color: 'red', marginLeft: '5px', fontSize: '1.1rem'}}>*</span></span>
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="recipient_address"
                        placeholder="Recipient Address"
                        type="email"
                        value={recipientAddress}
                        // onChange={(e) => setRecipientAddress(e.target.value)}
                        ref={address1Ref}
                        onChange={handleRecipientAddress}
                        required={true}
                      />
                      {recipientAddressError && (
                        <p
                          style={{
                            color: "red",
                            fontSize: 13,
                            margin: "3px 0px",
                          }}
                        >
                          {recipientAddressError}
                        </p>
                      )}
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
                       
                        <span>City{" "}<span style={{color: 'red', marginLeft: '5px', fontSize: '1.1rem'}}>*</span></span>
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="city"
                        placeholder="City"
                        type="text"
                        // onChange={(e) => setCity(e.target.value)}
                        onChange={handleCity}
                        value={city}
                        required={true}
                      />
                      {errorCity && (
                        <p
                          style={{
                            color: "red",
                            fontSize: 13,
                            margin: "3px 0px",
                          }}
                        >
                          {errorCity}
                        </p>
                      )}
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
                       
                        <span>Zip/Postal Code{" "}<span style={{color: 'red', marginLeft: '5px', fontSize: '1.1rem'}}>*</span></span>
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="zip_code"
                        placeholder="Zip/Postal Code"
                        type="text"
                        onChange={handleZipCode}
                        value={zipCode}
                        required={true}
                      />
                      {zipCodeError && (
                        <p
                          style={{
                            color: "red",
                            fontSize: 13,
                            margin: "3px 0px",
                          }}
                        >
                          {zipCodeError}
                        </p>
                      )}
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
                        
                        <span>Country{" "}<span style={{color: 'red', marginLeft: '5px', fontSize: '1.1rem'}}>*</span></span>
                      </label>
                      <input
                        className={
                          classess.page__fieldsContainer__form__formfield__input
                        }
                        name="country"
                        placeholder="Country"
                        type="text"
                        // onChange={(e) => setCountry(e.target.value)}
                        onChange={handleCountry}
                        value={country}
                        required={true}
                      />
                      {errorCountry && (
                        <p
                          style={{
                            color: "red",
                            fontSize: 13,
                            margin: "3px 0px",
                          }}
                        >
                          {errorCountry}
                        </p>
                      )}
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

export default ContractDetails;
