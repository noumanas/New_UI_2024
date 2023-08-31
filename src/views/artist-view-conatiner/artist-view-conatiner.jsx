import { useState } from "react";
import { useEffect } from "react";
import ArtistCard from "../../components/artist-card/artist-card";
import ArtistList from "../../components/artist-list/artist-list";
import Box from "@mui/material/Box";
import { allArtistsUseStyles } from "../../custom-mui-style/custom-mui-styles";

const ArtistViewConatiner = ({ selectedView }) => {
  const [smallScreen, setSmallScreen] = useState(false);

  function handleResize() {
    if (window.innerWidth <= 950) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const styles = allArtistsUseStyles();

  return (
    <>
      <Box variant="div" className={styles.root}>
        {selectedView === "list" ? (
          <>
            {smallScreen ? (
              <ArtistCard selectedView={selectedView} />
            ) : (
              <ArtistList />
              //Home screen
            )}
          </>
        ) : (
          <ArtistCard selectedView={selectedView} />
        )}
      </Box>
    </>
  );
};

export default ArtistViewConatiner;
