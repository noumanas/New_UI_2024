import React, { createContext, useContext, useState } from "react";

const GridLayoutContext = createContext();

export function GridLayoutProvider({ children }) {
  const [gridLayout, setGridLayout] = useState([]);
  const [isChangesSaved, setIsChangesSaved] = useState(false);

  return (
    <GridLayoutContext.Provider
      value={{ gridLayout, setGridLayout, isChangesSaved, setIsChangesSaved }}
    >
      {children}
    </GridLayoutContext.Provider>
  );
}

export function useGridLayout() {
  return useContext(GridLayoutContext);
}
