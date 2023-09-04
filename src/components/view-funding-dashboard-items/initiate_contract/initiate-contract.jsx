import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import classess from "./style.module.scss";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import SignStepper from "../../../containers/my-contracts/sign-stepper/SignStepper";
import PayStepper from "../../../containers/my-contracts/pay-stepper/PayStepper";

const InitiateContract = ({
  contract_length,
  artist_advance,
  marketing_budget,
}) => {
  const [containerExpanded, setContainerExpanded] = useState([
    false,
    false,
    false,
  ]);

  const toggleExpansion = (index) => {
    const updatedExpanded = containerExpanded.map((expanded, i) =>
      i === index ? !expanded : false
    );
    setContainerExpanded(updatedExpanded);
  };

  const data = [
    {
      name: "Contract Details",
      function: () => toggleExpansion(0),
      component: <SignStepper contract_length={contract_length} />,
    },
    {
      name: "Payment Details",
      function: () => toggleExpansion(1),
      component: (
        <PayStepper
          artist_advance={artist_advance}
          marketing_budget={marketing_budget}
        />
      ),
    },
    {
      name: "Review Details",
      function: () => toggleExpansion(2),
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
          Let's get started
        </Typography>
        <Box className={classess.contractList}>
          {data.map((item, index) => (
            <Box
              key={item.name}
              className={classess.list}
              style={{
                maxHeight: containerExpanded[index] ? "100%" : "85px",
                // transition: "max-height 0.3s ease",
              }}
            >
              <Box className={classess.listContent}>
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
                    {containerExpanded[index] ? (
                      <IoIosArrowForward />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ mt: 10 }}>
                {containerExpanded[index] && item.component}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default InitiateContract;
