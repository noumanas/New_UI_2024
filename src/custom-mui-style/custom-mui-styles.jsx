import Slider from "@mui/material/Slider";
import { makeStyles, withStyles } from "@mui/styles";

const muiTableCellUseStyles = makeStyles({
  row: {
    "& .MuiTableCell-root": {
      borderBottom: "none",
      backgroundColor: "#192233",
      // borderRadius: "12px",
    },
  },
});
const muiTableCellUseStylesforBorderRedius = makeStyles({
  row: {
    "&  .MuiTableCell-root": {
      borderBottom: "none",
      borderRadius: "12px 12px 12px 12px ",
    },
  },
});

const FabStyles = makeStyles({
  addButton: {
    backgroundColor: "#00CD98 !important",
    "&:hover": {
      backgroundColor: "#00CD98 !important",
    },
  },
});

const dialogBodyUseStyles = makeStyles({
  dialog: {
    "& .MuiPaper-root": {
      background: "#000",
      borderRadius: 12,
    },
    "& .MuiBackdrop-root": {
      backgroundColor: "none",
      backdropFilter: "blur(10px)",
    },
  },
});

const scrollbarUseStyles = makeStyles({
  global: {
    "*::-webkit-scrollbar": {
      width: "8px",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "none",
      background: "transparent",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#00135a",
      borderRadius: "12px",
    },
  },
});

const linearProgressBarUseStyles = makeStyles(() => ({
  root: {
    "& .MuiLinearProgress-colorPrimary": {
      borderRadius: "5px !important",
      height: "6px  !important",
      backgroundColor: "white  !important",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      background:
        "transparent linear-gradient(90deg, #36A1FF 0%, #FF64B7 100%) 0% 0% no-repeat padding-box !important",
    },
  },
}));

const myArtistAddBackdropUseStyles = makeStyles(() => ({
  root: {
    "& css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
  },
}));

const sideBarUseStyles = makeStyles(() => ({
  root: {
    "& .css-1ox7mnu-MuiTypography-root": {
      fontFamily: "DM Sans",
    },
  },
}));

const allArtistsUseStyles = makeStyles(() => ({
  root: {
    "& .css-y8ay40-MuiTableCell-root": {
      fontFamily: "DM Sans",
    },
    "& .css-1ex1afd-MuiTableCell-root": {
      fontFamily: "DM Sans",
    },
  },
}));

const viewArtistUseStyles = makeStyles(() => ({
  root: {
    "& .css-ahj2mt-MuiTypography-root": {
      fontFamily: "DM Sans",
    },
    "& .css-17we3i3-MuiStack-root>:not(style)+:not(style)": {
      margin: "5px 5px 5px 5px",
    },
    "& .css-y8ay40-MuiTableCell-root": {
      fontFamily: "DM Sans",
    },
    "& .css-1ex1afd-MuiTableCell-root": {
      fontFamily: "DM Sans",
    },
  },
}));

const viewFundingDashboardSelectUseStyles = makeStyles(() => ({
  root: {
    "& .Mui-selected": {
      backgroundColor: "transparent",
      width: 150,
      height: 30,
      color: "#fff !important",
      "&::after": {
        content: "''",
        display: "block",
        height: "5px",
        borderRadius: "2px",
        background: "#4ffcb7",
        bottom: "0px",
        position: "absolute",
        width: "100%",
        transition: "all 0.9s ease-in-out !important",
      },
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
    "& .MuiStepLabel-label.Mui-disabled": {
      color: "#8e929d",
    },

    "& .MuiStep-root": {
      backgroundColor: "#222C41",
      border: "1px solid #4FFCB7",
    },
    "& .MuiStep-root.Mui-completed": {
      backgroundColor: "#4FFCB7",
      border: "1px solid #4FFCB7",
    },
    "& .MuiTabs-root": {
      padding: "10px",
      backgroundColor: "transparent",
      borderRadius: 12,
      width: "fit-content",
      // overflowX: "auto",
    },

    "& .css-19m4u4b-MuiButtonBase-root-MuiTab-root": {
      color: "#ffffff !important",
    },
    "&  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
      color: "#ffffff !important",
      minHeight: "35px",
      fontFamily: "DM Sans",
      // minWidth: '160px !important'
    },
    "&  .css-1v7vp3m-MuiStep-root .MuiStepLabel-root .Mui-completed": {
      color: "#000 !important",
    },
  },
}));

const CustomSliderWithStyles = withStyles({
  rail: {
    backgroundImage: "#FFFFFF",
  },
  track: {
    backgroundImage: "linear-gradient(90deg, #4ffcb7, #4ffcb7)",
  },
})(Slider);

export {
  muiTableCellUseStyles,
  linearProgressBarUseStyles,
  myArtistAddBackdropUseStyles,
  viewFundingDashboardSelectUseStyles,
  CustomSliderWithStyles,
  dialogBodyUseStyles,
  scrollbarUseStyles,
  FabStyles,
  viewArtistUseStyles,
  sideBarUseStyles,
  allArtistsUseStyles,
  muiTableCellUseStylesforBorderRedius,
};
