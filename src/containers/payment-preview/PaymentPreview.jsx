import React, { useEffect, useState } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FileDownload from "js-file-download";
import { config as URLconfig } from "../../enviorment/enviorment";
import axios from "axios";
import { getItemToLocalStorage } from "../../services/storage";
import AuthEnum from "../../enums/auth.enum";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ContractHistory from "../../components/ContractHistory/ContractHistory";
import MakeaPaymentModal from "../../dialogs/make-payment/make-payment";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/slice/modal";
import TransferPaymentlist from "../../components/ArtistPaymentList/transfer-payment-list/TransferPaymentlist";
import { Avatar } from "@mui/material";

const PaymentPreview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [contract, setContract] = useState(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [payment, setpayment] = useState([]);
  const [openPanel, setOpenPanel] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [artist_name, setArtistName] = useState(null);
  const [valuation, setvaluation] = useState(null);
  const [pay_tracks, set_pay_tracks] = useState(null);
  const [artist_advance, setartist_advance] = useState(null);
  const [transefered_payments, setTransefered_payments] = useState([]);

  const modalName = useSelector((state) => state.modal.name);
  const internationalNumberFormat = new Intl.NumberFormat("en-US");
  useEffect(() => {
    let isApiSubscribed = true;
    axios.get(`${URLconfig.BASE_URL}/payments/${id}`).then((res) => {
      if (isApiSubscribed) {
        console.log("ressss", res);
        setTransefered_payments(res?.data?.data?.transfered_payment);
        // setArtistName(res?.data?.data?.artist_name)
        // setvaluation(res?.data?.data?.valuation);
        // set_pay_tracks(res?.data?.data?.Selected_tracks.length);
        setpayment(res?.data?.data);
        // setNotes(res.data.data.notes.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt)) ? 1 : -1))
      }
    });

    return () => {
      isApiSubscribed = false;
    };
  }, [id]);

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
                <Box
                  varient="div"
                  component="div"
                  className={
                    classess.page__details__box__tracks__header__img_title_container
                  }
                >
                  <Box
                    varient="div"
                    component="div"
                    className={
                      classess.page__details__box__tracks__header__img_title_container__img_container
                    }
                  >
                    <Avatar
                      src={payment?.artist?.avatar}
                      alt={payment?.name}
                      className={classess.table__row__artist_image}
                    />
                  </Box>

                  <Box varient="div" component="div">
                    <span
                      className={
                        classess.page__details__box__tracks__header__img_title_container__title
                      }
                    >
                      {payment?.artist_name}
                    </span>
                  </Box>
                </Box>

                <Box varient="div" component="div">
                  {user.role === "admin" && (
                    <Button
                      variant="contained"
                      className={
                        classess.page__details__box__tracks__header__amendbtn
                      }
                      onClick={() =>
                        dispatch(
                          openModal({
                            name: "MakePayment",
                            data: "",
                          })
                        )
                      }
                    >
                      Make Payment
                    </Button>
                  )}
                </Box>
              </Box>

              <Box
                varient="div"
                component="div"
                className={classess.page__details__box__details}
              >
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__details__box__details__innerbox}
                >
                  <span
                    className={
                      classess.page__details__box__details__innerbox__top_heading
                    }
                  >
                    VALUATION
                  </span>
                  <span
                    className={
                      classess.page__details__box__details__innerbox__heading
                    }
                  >
                    $ {internationalNumberFormat.format(payment?.valuation)}
                  </span>
                </Box>
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__details__box__details__innerbox}
                >
                  <span
                    className={
                      classess.page__details__box__details__innerbox__top_heading
                    }
                  >
                    TRACKS{" "}
                  </span>
                  <span
                    className={
                      classess.page__details__box__details__innerbox__heading
                    }
                  >
                    {payment?.Selected_tracks?.length}
                  </span>
                </Box>
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__details__box__details__innerbox}
                >
                  <span
                    className={
                      classess.page__details__box__details__innerbox__top_heading
                    }
                  >
                    ARTIST ADVANCE
                  </span>
                  <span
                    className={
                      classess.page__details__box__details__innerbox__heading
                    }
                  >
                    ${" "}
                    {internationalNumberFormat.format(
                      Math.round(payment?.artist_advance)
                    )}
                  </span>
                </Box>
                <Box
                  varient="div"
                  component="div"
                  className={classess.page__details__box__details__innerbox}
                >
                  <span
                    className={
                      classess.page__details__box__details__innerbox__top_heading
                    }
                  >
                    MARKETING
                  </span>
                  <span
                    className={
                      classess.page__details__box__details__innerbox__heading
                    }
                  >
                    ${" "}
                    {internationalNumberFormat.format(
                      Math.round(payment?.artist_marketing_budget)
                    )}
                  </span>
                </Box>
              </Box>
              <TransferPaymentlist
                transefered_payments={transefered_payments}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {modalName === "MakePayment" && <MakeaPaymentModal payment={payment} />}
    </Container>
  );
};

export default PaymentPreview;
