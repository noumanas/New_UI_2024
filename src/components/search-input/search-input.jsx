import React from 'react';
import classess from "./style.module.scss";
import Box from '@mui/material/Box'
import searchicon from "../../assets/icons/fancy_search.svg";

const SearchInput = ({ onInput }) => {
    return (
        <Box varient="div" component="div" className={classess.page}>
            <input
                className={classess.page__input}
                name="search"
                placeholder="Search"
                onInput={onInput}
                type="text"
            />
            <img
                src={searchicon}
                alt="search icon"
                className={classess.page__icon}
            />
        </Box>
    )
}

export default SearchInput;