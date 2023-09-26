import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CustomSliderWithStyles } from "../../../../custom-mui-style/custom-mui-styles";
import classess from "./style.module.scss";

const Slider = ({ onChangeHandler, row }) => {
  const [stream_income_share, set_stream_income_share] = useState(
    row.stream_income_share
  );

  useEffect(() => {
    if (row && Object.keys(row).length) {
      set_stream_income_share(row.stream_income_share);
    }
  }, [row]); // eslint-disable-next-line

  return (
    <React.Fragment>
      <div style={{ display: "flex", alignItems: "center", width: "160px" }}>
        <input
          type="number"
          onChange={(e) => {
            if (e.target.value < 1 || e.target.value > 100) {
              toast.warning("Share of income invalid");
            } else {
              onChangeHandler(row.id, e.target.value);
              set_stream_income_share(e.target.value);
            }
          }}
          defaultValue={stream_income_share}
          value={stream_income_share}
          className={classess.page__inputField}
          id="quantity"
          name="quantity"
          min={0}
          max={100}
        />
        <span
          component="div"
          style={{ fontSize: "16px", margin: "0px 10px 0px 0px" }}
        >
          %
        </span>
        <CustomSliderWithStyles
          key={`slider`}
          defaultValue={stream_income_share}
          value={stream_income_share}
          aria-label="Default"
          type="range"
          min={0}
          max={100}
          step={5}
          valueLabelDisplay="auto"
          name="stream_income_share"
          onChange={(e) => set_stream_income_share(e.target.value)}
          onChangeCommitted={(e, v) => {
            onChangeHandler(row.id, v);
            set_stream_income_share(v);
          }}
          sx={{
            "& .MuiSlider-rail": {
              backgroundImage: "linear-gradient(90deg, #4C5465, #4C5465)", // Background color
            },

            "& .MuiSlider-thumb": {
              backgroundColor: "#ffff", // Thumb color
              width: "12px",
              height: "12px",
            },
            "& .MuiSlider-track": {
              borderColor: "#4ffcb7",
              height: "2px",
            },
          }}
        />

        {/* <span component="div" style={{ marginLeft: "20px", fontSize: "10px" }}>
                    {stream_income_share}%
                </span> */}
      </div>
    </React.Fragment>
  );
};

export default Slider;
