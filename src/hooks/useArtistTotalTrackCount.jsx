import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { config as URLconfig } from "../enviorment/enviorment";

const useArtistTotalTrackCount = () => {
  const [totalTracks, setTotalTracks] = useState(0);
  const [isLoaded, setisLoaded] = useState(false);
  const artist = useSelector((state) => state.artist.artist);

  useEffect(() => {
    if (artist) {
      fetch(`${URLconfig.BASE_URL}/artist-tracks/${artist?.spotify_id}`)
        .then((res) => res.json())
        .then((response) => {
          setTotalTracks(response?.data.length);
          setisLoaded(true);
        });
    }
  }, [artist, isLoaded]);

  return { isLoaded, totalTracks };
};

export default useArtistTotalTrackCount;
