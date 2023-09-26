import React from "react";
import classess from "./style.module.scss";
import PreLoaderImg from "../../assets/logo/PreLoader.png";

const PreLoader = () => {
  return (
    <div className={classess.page}>
      {/* <div className={classess.page__loader}> */}
      <img src={PreLoaderImg} className={classess.page__center_img} />
      {/* <div className={classess.page__loader__bar}></div>
        <div className={classess.page__loader__bar}></div>
        <div className={classess.page__loader__bar}></div>
        <div className={classess.page__loader__bar}></div>
        <div className={classess.page__loader__bar}></div>
        <div className={classess.page__loader__ball}></div> */}
      {/* </div> */}
    </div>
  );
};

export default PreLoader;
