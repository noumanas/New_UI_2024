import React, { useState, useEffect } from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { RiDeleteBin2Fill } from "react-icons/ri";
// import newMusicImg from "../../assets/newMusicImg.jpeg";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  // CustomSliderWithStyles,
  muiTableCellUseStyles,
} from "../../custom-mui-style/custom-mui-styles";
import FormControl from "@mui/material/FormControl";
// import { grey } from "@mui/material/colors";
import { getFullYearWithRange, monthsOptions } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { PiMusicNotesPlusBold } from "react-icons/pi";
import { BsPlus } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import {
  deleteNewMusic,
  getNewMusicByID,
  postNewMusic,
  updateNewMusic,
} from "../../redux/slice/new-music";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
// import CloseIcon from "@mui/icons-material/Close";
import DeleteNewMusicRecordDialog from "../../dialogs/delete-new-music-record-dialog/delete-new-music-record-dialog";
import {
  // Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import PencilIcon from "../../assets/buttonsicons/EditIcon.png";
import DeleteIcon from "../../assets/buttonsicons/DeleteIcon.png";

const NewMusic = ({
  // newMusicIncomeArtistKeeps,
  // new_music_income,
  artist_id,
  getArtistFunding,
  // set_new_music_income,
  openNewMusicForm,
  closeNewMusicForm,
  // openTrackes,
  Showtracks,
  Hidetracks,
}) => {
  const artist = useSelector((state) => state.artist.artist);
  console.log(artist);
  const dispatch = useDispatch();
  const newMusicData = useSelector((state) => state.new_music.newMusic);

  const [includeMusicActive, setIncludeMusicActive] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [radioValue, setRadioValue] = useState("single");
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState();
  const [delete_new_music_records, setdelete_new_music_records] = useState();
  const [open, setOpen] = useState(false);

  const initUIData = () => {
    dispatch(
      getNewMusicByID({
        id: artist_id,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (year !== "") {
      setIsLoading(true);
      if (isEdit) {
        updateNewMusicRelease();
      } else {
        postNewMusicRelease();
      }
      getArtistFunding();
    } else {
      toast.error("please fill year field ");
    }
    setIsEditMode(false);
    hideTracks();
  };

  const postNewMusicRelease = () => {
    const current_date = new Date();
    const selected_date = new Date();
    selected_date.setMonth(parseInt(month));
    selected_date.setFullYear(parseInt(year));

    if (selected_date <= current_date) {
      toast.error("You cannot select past date.");
      setIsLoading(false);
    } else {
      const payload = {
        year,
        month: monthsOptions[parseInt(month)].value,
        music: radioValue,
        artist_id,
      };
      const request = dispatch(
        postNewMusic({
          data: payload,
        })
      );

      request
        .then(() => {
          setIsLoading(false);
          initUIData();
          emptyFields();
          setIncludeMusicActive(false);
          closeNewMusicForm();
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
          emptyFields();
          setIncludeMusicActive(false);
          closeNewMusicForm();
        });
    }
  };

  const updateNewMusicRelease = () => {
    const current_date = new Date();
    const selected_date = new Date();
    selected_date.setMonth(parseInt(month));
    selected_date.setFullYear(parseInt(year));

    if (selected_date <= current_date) {
      toast.error("You cannot select past date.");
      setIsLoading(false);
    } else {
      const payload = {
        year,
        month: monthsOptions[month].value,
        music: radioValue,
        artist_id: editRecord?.artist_id,
      };
      const request = dispatch(
        updateNewMusic({
          data: payload,
          id: editRecord?._id,
        })
      );

      request
        .then(() => {
          setIsLoading(false);
          initUIData();
          emptyFields();
          setIsEdit(false);
          setIncludeMusicActive(false);
          closeNewMusicForm();
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
          emptyFields();
          setIsEdit(false);
          setIncludeMusicActive(false);
          closeNewMusicForm();
        });
    }
  };
  const handleOpenDeleteDialog = (new_misic) => {
    setdelete_new_music_records(new_misic);
    setOpen(true);
  };
  const handleCloseDeleteDialog = (res) => {
    setOpen(false);
    if (res) {
      deleteNewMusicRelease(delete_new_music_records);
    }
  };
  const deleteNewMusicRelease = (id) => {
    const request = dispatch(
      deleteNewMusic({
        id: id,
      })
    );
    request
      .then(() => {
        initUIData();
        getArtistFunding();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (record) => {
    setIsEditMode(true);
    setIsEdit(true);
    setEditRecord(record);
    setYear(record?.year);
    let index = monthsOptions.findIndex((e) => e.value === record?.month);
    setMonth(index);
    setRadioValue(record?.music);
    setIncludeMusicActive(true);
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const cancelForm = () => {
    setIsEditMode(false);
    emptyFields();
    setIncludeMusicActive(false);
    closeNewMusicForm();
    // setOpenNewMusicForm(false);
  };

  const emptyFields = () => {
    setMonth("");
    setYear(undefined);
    setRadioValue("single");
  };

  // useEffect(() => {
  //   initUIData();
  // }, []);

  const cellUseStyles = muiTableCellUseStyles();
  // const [isChecked, setIsChecked] = useState(false);

  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  // };
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const showTracks = () => {
    Showtracks();
  };
  const hideTracks = () => {
    Hidetracks();
  };
  const [recoupmentRate, setRecoupmentRate] = useState("");

  const handleRecoupmentRate = (event) => {
    let inputValue = event.target.value;

    // Ensure the input is within the range of 1 to 100
    if (inputValue === "" || (inputValue >= 1 && inputValue <= 100)) {
      setRecoupmentRate(inputValue);
    }
  };
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Box varient="div" component="div" className={classess.page}>
      <Box varient="div" component="div" className={classess.page__new_music}>
        <Box sx={{ fontSize: "12px" }}>
          <b>Note:</b> new music projects are based on historical tracks public
          training data; it is important to select tracks that would fairly
          represent the upcoming music. Please select new music tracks that best
          represent your next release(S)
        </Box>

        <Box
          varient="div"
          component="div"
          className={classess.page__music_container}
        >
          {/* {includeMusicActive && ( */}
          <Box
            varient="div"
            component="div"
            className={classess.page__music_container__button_container}
          >
            <Button
              type="button"
              onClick={() => setIncludeMusicActive(true)}
              className={`${
                classess.page__music_container__button_container__button
              }
                ${
                  includeMusicActive || openNewMusicForm
                    ? classess.buttonDisabled
                    : classess.buttonActive
                }`}
              // sx={{
              //   backgroundColor: includeMusicActive ? "#498E72" : "##498E72",
              // }}
              startIcon={<PiMusicNotesPlusBold />}
            >
              Add New Music
            </Button>
          </Box>

          {/* )} */}
        </Box>
      </Box>

      {/* Form */}

      {(openNewMusicForm || includeMusicActive) && (
        <Box
          varient="div"
          component="div"
          className={classess.page__new_music__main}
        >
          <Stack
            direction="row"
            gap={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              mt: 1,
              pb: 2,
            }}
          >
            <Box>
              <FormControl>
                <Typography
                  sx={{
                    pb: 2,
                  }}
                  className={classess.smallHeading}
                >
                  TYPE OF TRACK
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={radioValue}
                  defaultValue={radioValue}
                  name="radio-buttons-group"
                  onChange={handleRadioChange}
                  sx={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <FormControlLabel
                    value="single"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": { color: "#4ffcb7" },
                        }}
                        className={classess.radioBtn}
                      />
                    }
                    label="Single"
                  />
                  <FormControlLabel
                    value="ep"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": { color: "#4ffcb7" },
                        }}
                        className={classess.radioBtn}
                      />
                    }
                    label="EP"
                  />
                  <FormControlLabel
                    value="album"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": { color: "#4ffcb7" },
                        }}
                        className={classess.radioBtn}
                      />
                    }
                    label="Album"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box>
              <form
                autoComplete="off"
                className={classess.page__new_music__main__form}
                onSubmit={onSubmit}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "30px",
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__new_music__main__form__form_fields
                      }
                    >
                      <Box>
                        <Typography
                          sx={{
                            pb: 2,
                          }}
                          className={classess.smallHeading}
                        >
                          MONTH
                        </Typography>
                        <select
                          type="text"
                          name="month"
                          placeholder="Month"
                          value={month}
                          onChange={(e) => {
                            setMonth(e.target.value);
                          }}
                          className={
                            classess.page__new_music__main__form__form_fields__select
                          }
                          required
                        >
                          <option style={{ color: "red" }}>Select Month</option>
                          {monthsOptions.map((month, index) => (
                            <option value={index}>{month.key}</option>
                          ))}
                        </select>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            pb: 2,
                          }}
                          className={classess.smallHeading}
                        >
                          YEAR
                        </Typography>
                        <input
                          type="number"
                          min={getFullYearWithRange(0)}
                          maxLength={4}
                          minLength={4}
                          max={2033}
                          name="year"
                          placeholder="2023"
                          value={year}
                          onInput={(event) => setYear(event.target.value)}
                          className={
                            classess.page__new_music__main__form__form_fields__input
                          }
                          requried
                        />
                      </Box>
                      <Box
                        sx={{
                          position: "relative",
                        }}
                      >
                        <Typography
                          sx={{
                            pb: 2,
                          }}
                          className={classess.smallHeading}
                        >
                          RECOUPMENT RATE
                        </Typography>
                        <input
                          type="number"
                          placeholder="80"
                          value={recoupmentRate}
                          onChange={handleRecoupmentRate}
                          className={
                            classess.page__new_music__main__form__form_fields__input
                          }
                          min="1"
                          max="100"
                          required
                        />
                        <Typography
                          sx={{
                            fontSize: "10px",
                            position: "absolute",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {" "}
                          Input should be 1 to 100
                        </Typography>
                        <Box
                          sx={{
                            position: "absolute",
                            fontSize: "22px",
                            // bottom: "3px",
                            top: "35px",
                            left: "38px",
                            color: "#6d7480",
                          }}
                        >
                          %
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: 3.8,
                    }}
                  >
                    <Box
                      varient="div"
                      component="div"
                      className={
                        classess.page__new_music__main__form__form_fields
                      }
                    >
                      <Button
                        type="submit"
                        className={classess.page__new_music__main__form__button}
                        disabled={isLoading}
                        startIcon={<BsPlus />}
                      >
                        {isLoading && (
                          <CircularProgress size={25} color="inherit" />
                        )}
                        {isEditMode ? "Update" : "Add"}
                      </Button>
                      <Button
                        type="button"
                        className={
                          classess.page__new_music__main__form__button2
                        }
                        disabled={isLoading}
                        // onClick={cancelForm}
                        onClick={() => {
                          hideTracks();
                          cancelForm();
                        }}
                        startIcon={<RxCross2 />}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </form>
            </Box>
          </Stack>
        </Box>
      )}

      {/* Listing after add track */}
      {!includeMusicActive && !openNewMusicForm && (
        <Box
          varient="div"
          component="div"
          className={classess.page__music_details}
        >
          {newMusicData && newMusicData.length ? (
            <Box
              varient="div"
              component="div"
              className={classess.page__music_details__main_container}
            >
              <TableContainer className={classess.table}>
                <Table stickyHeader={true} aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        padding="checkbox"
                        className={classess.table__col}
                      >
                        <Box sx={{ ml: 1.5 }}>
                          <Checkbox className={classess.table__col__checkBox} />
                        </Box>
                      </TableCell>
                      <TableCell className={classess.table__col}>
                        <Box sx={{ ml: 7 }}>Type</Box>
                      </TableCell>
                      <TableCell className={classess.table__col}>
                        Release Date
                      </TableCell>{" "}
                      <TableCell className={classess.table__col}>
                        <Box
                          sx={{
                            textAlign: "right",
                            paddingRight: "40px",
                          }}
                        >
                          Action
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newMusicData.map((music) => (
                      <>
                        <Box sx={{ m: "1rem" }}></Box>

                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            height: "80px",
                          }}
                          className={`${classess.table__row} ${cellUseStyles.row}`}
                        >
                          <TableCell
                            className={classess.table__row}
                            sx={{
                              borderTopLeftRadius: "12px",
                              borderEndStartRadius: "12px",
                            }}
                          >
                            <Checkbox
                              className={classess.table__row__checkBox}
                            />
                          </TableCell>
                          <TableCell className={classess.table__row}>
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                              }}
                            >
                              <Box>
                                <LazyLoadImage
                                  src={artist?.avatar}
                                  alt="artist img"
                                  className={classess.table__row__avatar}
                                />
                                {/* <img
                                  src={artist?.avatar}
                                  alt="artist img"
                                /> */}
                              </Box>
                              <Box>
                                <Typography
                                  sx={{ fontSize: "16px", fontWeight: "bold" }}
                                >
                                  {music?.music}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>{" "}
                          <TableCell className={classess.table__row}>
                            {music?.month} {music?.year}
                          </TableCell>{" "}
                          <TableCell
                            className={classess.table__row}
                            sx={{
                              borderTopRightRadius: "12px",
                              borderEndEndRadius: "12px",
                            }}
                          >
                            <Box
                              sx={{
                                textAlign: "right",
                                paddingRight: "20px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  gap: "10px",
                                }}
                              >
                                <Tooltip
                                  title="Edit Track"
                                  placement="top"
                                  arrow
                                  enterDelay={100}
                                >
                                  <IconButton
                                    className={classess.actionEdit}
                                    // onClick={() => handleEdit(music)}
                                    onClick={() => {
                                      handleEdit(music);
                                      showTracks();
                                    }}
                                  >
                                    <img
                                      src={PencilIcon}
                                      alt="Eye"
                                      style={{
                                        height: "16px",
                                        width: "15.98px",
                                      }}
                                    />
                                    {/* <EditIcon sx={{ fontSize: "20px" }} /> */}
                                  </IconButton>
                                </Tooltip>

                                <Tooltip
                                  title="Delete Track"
                                  placement="top"
                                  arrow
                                  enterDelay={100}
                                >
                                  <IconButton
                                    className={classess.actionDelete}
                                    // onClick={() => handleOpenDeleteDialog(row)}
                                    onClick={() =>
                                      handleOpenDeleteDialog(music?._id)
                                    }
                                  >
                                    <img
                                      src={DeleteIcon}
                                      alt="Eye"
                                      style={{ height: "16px", width: "16px" }}
                                    />
                                    {/* <RiDeleteBin2Fill
                                      sx={{ fontSize: "20px" }}
                                    /> */}
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : null}
        </Box>
      )}

      {!includeMusicActive && newMusicData?.length >= 1 ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          sx={{ color: "#d6d6d6" }}
          count={newMusicData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          classes={{
            actions: "custom-pagination-actions",
            select: "custom-pagination-select",
            displayedRows: "custom-select-style",
            selectLabel: "custom-select-style",
          }}
          SelectProps={{
            classes: {
              select: "custom-select", // Apply the custom-select class to the Select component
            },
          }}
        />
      ) : null}

      <DeleteNewMusicRecordDialog
        onClose={handleCloseDeleteDialog}
        open={open}
        track={delete_new_music_records}
      />
    </Box>
  );
};

export default NewMusic;
