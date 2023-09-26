import React from "react";
import classess from "./style.module.scss";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";

const SearchAutcomplete = ({ list, search, onInput, handleSearchItem }) => {
  return (
    <Box
      varient="div"
      component="div"
      className={classess.container}
      // sx={{ minWidth: { xs: "100%", sm: "100%", lg: "45%" } }}
    >
      <Box
        varient="div"
        component="div"
        className={classess.container__search_box}
        // sx={{ position: "relative" }}
      >
        <input
          name="search"
          placeholder="Search by artist name
          "
          type="text"
          value={search}
          onInput={onInput}
          autoComplete="off"
          className={classess.container__search_box__search_input}
        />
      </Box>
      {list && list.length ? (
        <ul className={classess.container__list}>
          {list.map((item, idx) => (
            <li key={idx} className={classess.container__list__list_item}>
              <Box
                component="div"
                varient="div"
                className={classess.container__list__list_item__contains}
                onClick={() => handleSearchItem(item)}
              >
                <Avatar alt={item.name} src={item.image} />
                <span
                  className={
                    classess.container__list__list_item__contains__title
                  }
                >
                  {item.name}
                </span>
              </Box>
            </li>
          ))}
        </ul>
      ) : null}
    </Box>
  );
};

export default SearchAutcomplete;
