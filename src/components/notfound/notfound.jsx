import React from "react";
import classess from "./style.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthEnum from "../../enums/auth.enum";
import { getItemFromCurrentSession } from "../../services/session";

const NotFound = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  return (
    <div className={classess.mainNotFound}>
      <div className={classess.mainNotFound__message_box}>
        <h1 className={classess.mainNotFound__message_box__heading}>404</h1>
        <p>Page not found</p>
        <div
          className={classess.mainNotFound__message_box__heading__button_con}
        >
          <div
            className={
              classess.mainNotFound__message_box__heading__button_con__action_link_wrap
            }
          >
            <button
              className={
                classess.mainNotFound__message_box__heading__button_con__action_link_wrap__link_button
              }
              onClick={(e) => {
                e.preventDefault();
                navigate("../");
              }}
            >
              Go Back
            </button>
            <button
              className={
                classess.mainNotFound__message_box__heading__button_con__action_link_wrap__link_button
              }
              onClick={(e) => {
                e.preventDefault();
                if (user || getItemFromCurrentSession(AuthEnum.TOKEN)) {
                  navigate("/blig/home");
                } else {
                  navigate("/blig/home");
                }
              }}
            >
              Go to Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
