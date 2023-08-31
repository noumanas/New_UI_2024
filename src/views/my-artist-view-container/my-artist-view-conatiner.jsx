import { useState } from "react";
import { useEffect } from "react";
import MyArtistCard from "../../components/my-artist-card/my-artist-card";
import MyArtistList from "../../components/my-artist-list/my-artist-list";

const MyArtistViewContainer = ({ selectedView }) => {
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

  return (
    <>
      {selectedView === "list" ? (
        <>
          {smallScreen ? (
            <MyArtistCard selectedView={selectedView} />
          ) : (
            <MyArtistList />
          )}
        </>
      ) : (
        <MyArtistCard selectedView={selectedView} />
      )}
    </>
  );
};

export default MyArtistViewContainer;
