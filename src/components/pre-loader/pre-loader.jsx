import React from "react";
import classess from "./style.module.scss";
import BlacklionLogo from "../../assets/logo/BlacklionLogo.png";

const PreLoader = () => {
  return (
    <div className={classess.page}>
      <div className={classess.page__loader}>
        <img src={BlacklionLogo} />
        {/* <div className={classess.page__loader__bar}></div>
        <div className={classess.page__loader__bar}></div>
        <div className={classess.page__loader__bar}></div>
        <div className={classess.page__loader__bar}></div>
        <div className={classess.page__loader__bar}></div>
        <div className={classess.page__loader__ball}></div> */}
      </div>
    </div>
  );
};

export default PreLoader;
