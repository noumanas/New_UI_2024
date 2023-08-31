import React from 'react';
import classess from "./style.module.scss"

const GradientButton = ({ text, ...others }) => {
    return (
        <>
            <button className={classess.gradient_button} {...others}>{text}</button>
        </>
    )
}

export default GradientButton