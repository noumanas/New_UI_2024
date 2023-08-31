import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import classess from "./style.module.scss";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const InitiateContract = ({ contractName }) => {
  const [containerHeights, setContainerHeights] = useState([85, 85, 85]);

  const toggleHeight = (index) => {
    const updatedHeights = containerHeights.map((height, i) =>
      i === index ? (height === 85 ? 300 : 85) : 85
    );
    setContainerHeights(updatedHeights);
  };

  const data = [
    {
      name: "Contract Details",
      function: () => toggleHeight(0),
    },
    {
      name: "Payment Details",
      function: () => toggleHeight(1),
    },
    {
      name: "Review Details",
      function: () => toggleHeight(2),
    },
  ];

  return (
    <Box className={classess.customPanel}>
      <Box className={classess.contractContainer}>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#4FFCB7",
            textTransform: "uppercase",
          }}
        >
          lets get started
        </Typography>
        <Box className={classess.contractList}>
          {data.map((item, index) => (
            <Box
              key={item.name}
              className={classess.list}
              style={{
                height: containerHeights[index] + "px",
                overflow: containerHeights[index] === 300 ? "hidden" : "unset",
                transition: "height 0.3s ease",
              }}
            >
              <Box sx={{ fontSize: "30px", fontWeight: "bold" }}>
                {item.name}
              </Box>
              <Box sx={{ mt: 1 }}>
                <IconButton
                  sx={{
                    backgroundColor: "#4ffcb7",
                    color: "#000000",
                    width: "30px",
                    height: "30px",
                    transition: "color 0.3s ease",
                    ":hover": {
                      backgroundColor: "#4ffcb7",
                      color: "#000000",
                    },
                  }}
                  onClick={item.function}
                >
                  {containerHeights[index] === 300 ? (
                    <IoIosArrowForward />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default InitiateContract;
