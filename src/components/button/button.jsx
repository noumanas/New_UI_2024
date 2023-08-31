import React from 'react';
import classess from "./style.module.scss";

const Button = ({ text, onClick, ...others }) => {
  return (
      <button {...others} className={classess.button} onClick={onClick}>{text}</button>
  )
}

export default Button