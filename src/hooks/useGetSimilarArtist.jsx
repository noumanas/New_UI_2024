import { useDispatch } from "react-redux";
import { getSimilarArtist } from "../api/spotify.api";
import {
  getSimilarArtistByID,
  postSimilarArtist,
} from "../redux/slice/similar-artist";

const useGetSimilarArtist = () => {
  const dispatch = useDispatch();

  const mapperSimiilarArtist = (artist, id) => ({
    artist_id: id,
    similar_artist_id: artist?.id,
    name: artist?.name,
    popularity: artist?.popularity,
    image: artist?.images[2]?.url || "",
    followers: artist?.followers.total,
    genres: artist?.genres,
    status: artist?.status || false,
  });

  const postSimilarArtistFromBindServer = (allArtist, id) => {
    const response = dispatch(
      postSimilarArtist({
        data: allArtist,
      })
    );
    response
      .then(() => {
        dispatch(
          getSimilarArtistByID({
            id,
          })
        );
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const handleArtistFromSpotify = (id) => {
    getSimilarArtist(id)
      .then((res) => {
        const allArtist = res.artists.map((artist) =>
          mapperSimiilarArtist(artist, id)
        );
        postSimilarArtistFromBindServer(allArtist, id);
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const getArtistOfSimilarArtist = (id) => {
    const response = dispatch(
      getSimilarArtistByID({
        id,
      })
    );

    response
      .then((res) => {
        if (!res.payload.data.length) {
          handleArtistFromSpotify(id);
        }
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  return {
    similarArtists: (id) => getArtistOfSimilarArtist(id),
  };
};

export default useGetSimilarArtist;
