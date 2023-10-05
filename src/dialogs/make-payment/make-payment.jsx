import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import classess from "./style.module.scss";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slice/modal";
import { toast } from "react-toastify";
import { getItemToLocalStorage } from "../../services/storage";
import AuthEnum from "../../enums/auth.enum";
import { config as URLconfig } from "../../enviorment/enviorment";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";

export default function MakeaPaymentModal({ payment }) {
  const { id } = useParams();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentpayble, setpaymentpayble] = useState("");
  const [btndisabled, setbtndisabled] = useState(true);
  const [paymentAmount, setpaymentAmount] = useState(0);
  const [prePayment, setPrePayment] = useState(0);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  // const mapTracks = (artistTrack) => ({
  //   id: artistTrack._id,
  //   title: artistTrack.title,
  //   image: artistTrack.track_img,
  //   stream_income_share: artistTrack.stream_income_share,
  //   spotify_streams_total: artistTrack.spotify_streams_total,
  //   youtube_video_views_total: artistTrack.youtube_video_views_total,
  //   tiktok_views_total: artistTrack.tiktok_views_total,
  //   deezer_reach_total: artistTrack.deezer_reach_total,
  //   isrc: artistTrack.isrc,
  //   release_date: artistTrack.release_date,
  //   is_selected: artistTrack.is_selected,
  //   songstats_track_id: artistTrack.songstats_track_id,
  //   historic: artistTrack.historic,
  //   last_streams_growth: artistTrack.last_streams_growth
  // });

  const handlePaymentMethodChange = (event) => {
    const selectedValue = event.target.value;
    const valueMapping = {
      "Artist Advance": payment?.artist_advance || 0,
      Marketing: payment?.artist_marketing_budget || 0,
    };
    const numberValue = valueMapping[selectedValue] || 0;
    setpaymentpayble(selectedValue);
    setPrePayment(numberValue);
    setpaymentAmount(numberValue);
  };

  const handleChange = (event) => {
    if (paymentpayble) {
      let value1 = parseInt(event.target.value, 10);
      let conditional_value = parseInt(prePayment);
      if (value1 > conditional_value || value1 <= 0) {
        if (paymentpayble === "Artist Advance") {
          setError(
            `Payment amount cannot be more than $( ${payment?.artist_advance} )`
          );
          setbtndisabled(true);
        }
        if (paymentpayble === "Marketing") {
          setError(
            `Payment amount cannot be more than $( ${payment?.artist_marketing_budget} )`
          );
          setbtndisabled(true);
        }
      } else {
        if (paymentMethod) {
          setbtndisabled(false);
        } else {
          setbtndisabled(true);
        }
        setError("");
      }
    } else {
      setbtndisabled(false);
      setError("");
    }
  };

  const handleMakepayment = (event) => {
    const selectedValue = event.target.value;
    const valueMapping = {
      None: true,
      Stripe: false,
      Trolley: false,
    };
    const CheckPaymentMethod = valueMapping[selectedValue];
    if (paymentpayble) {
      setbtndisabled(CheckPaymentMethod);
    }

    setPaymentMethod(selectedValue);
  };

  const handlesubmitbtn = (e, id) => {
    e.preventDefault();
    let config = {
      headers: {
        authorization: `Bearer ${getItemToLocalStorage(AuthEnum.TOKEN)}`,
      },
    };
    const payload = {
      transection_id: Math.floor(Math.random() * 11022119877),
      mode: paymentMethod,
      amount_paid: paymentAmount,
      status: "paid",
      comments: comment,
      paid_against: paymentpayble,
    };
    let updatePayment = {};
    if (paymentpayble === "Artist Advance") {
      updatePayment = {
        artistMarketingBudget: payment?.artist_marketing_budget,
        artist_advance: prePayment - paymentAmount,
        last_payment_paid: paymentAmount,
      };
    } else {
      updatePayment = {
        artistMarketingBudget: prePayment - paymentAmount,
        artist_advance: payment?.artist_advance,
        last_payment_paid: paymentAmount,
      };
    }
    // const updatePayment = {
    //   artist_marketing_budget:marketingPay,
    //   artist_advance:(prePayment-paymentAmount)
    // }
    axios
      .post(
        `${URLconfig.BASE_URL}/payments/${id}/transefered_payments`,
        payload,
        config
      )
      .then((res) => {
        axios
          .put(`${URLconfig.BASE_URL}/payments/${id}`, updatePayment, config)
          .then((res) => {
            // PUT request successful
            toast.success("Payment Updates");
            window.location.reload();
          })
          .catch((error) => {
            toast.error("PUT Request Error");
            console.log(error);
          });
      })
      .catch((error) => {
        toast.error("POST Request Error");
        console.log(error);
      });
  };

  return (
    <div>
      <Modal
        keepMounted
        open={isOpen}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box varient="div" component="div" className={classess.page}>
          <Container>
            <Box
              varient="div"
              component="div"
              className={classess.page__dialog}
            >
              <Box
                varient="div"
                component="div"
                className={classess.page__dialog__header}
              >
                <span className={classess.page__dialog__header__title}>
                  Make a Payment
                </span>
              </Box>
              <form
                autoComplete="off"
                className={classess.page__dialog__form}
                onSubmit={(e) => handlesubmitbtn(e, id)}
              >
                <Box className={classess.page__dialog__form__field_container}>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      Pay Against *
                    </label>

                    <Select
                      value={paymentpayble}
                      onChange={handlePaymentMethodChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className={
                        classess.page__dialog__form__field_container__field__select
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Artist Advance"}>
                        Artist Advance
                      </MenuItem>
                      <MenuItem value={"Marketing"}>Marketing Budget</MenuItem>
                    </Select>
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      Payment Method *
                    </label>
                    <Select
                      value={paymentMethod}
                      onChange={handleMakepayment}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className={
                        classess.page__dialog__form__field_container__field__select
                      }
                    >
                      <MenuItem value={"None"}>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Stripe"}>Stripe</MenuItem>
                      <MenuItem value={"Trolley"}>Trolley</MenuItem>
                    </Select>
                  </Box>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                    onChange={(e) => setpaymentAmount(e.target.value)}
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      Payment Amount *
                    </label>
                    <>
                      <input
                        className={
                          classess.page__dialog__form__field_container__field__input
                        }
                        value={paymentAmount}
                        name="Payment_Amount"
                        placeholder="$"
                        type="text"
                        min={0}
                        max={100000}
                        onChange={handleChange}
                        required
                      />
                      {error && <div style={{ color: "red" }}>{error}</div>}
                    </>
                  </Box>
                </Box>

                <Box className={classess.page__dialog__form__field_container}>
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__dialog__form__field_container__field
                    }
                  >
                    <label
                      className={
                        classess.page__dialog__form__field_container__field__label
                      }
                    >
                      Add Comments
                    </label>
                    <TextField
                      className={
                        classess.page__dialog__form__field_container__field__inputComment
                      }
                      multiline="true"
                      rows="5"
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      placeholder="Add Comments"
                    />
                  </Box>
                </Box>
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__dialog__form__actions}
                >
                  <Stack
                    direction="row"
                    gap={5}
                    sx={{ width: { xs: "100%", sm: "100%", lg: "49%" } }}
                  >
                    <Button
                      variant="outlined"
                      type="button"
                      className={
                        classess.page__dialog__form__actions__cancel_btn
                      }
                      onClick={() => dispatch(closeModal())}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type=""
                      className={
                        classess.page__dialog__form__actions__submit_btn
                      }
                      disabled={btndisabled}
                    >
                      Make a Payment
                    </Button>
                  </Stack>
                </Box>
              </form>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
