import React, { Suspense, useEffect, useState } from "react";
import "./App.scss";
import Navigation from "./navigation/navigation";
import { me } from "./redux/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PreLoader from "./components/pre-loader/pre-loader";
import {
  destroySpotifySession,
  _fetchToken,
} from "./utils/spotifyApiServiceHandler";
import { getItemFromCurrentSession } from "./services/session";
import AuthEnum from "./enums/auth.enum";
// import { isJwtExpired } from "jwt-check-expiration";
// import { logout } from "./redux/slice/auth";
import { config as URLconfig } from "./enviorment/enviorment";
import axios from "axios";
import useArtist from "./hooks/useArtist";
import ArtistPreLoader from "./components/pre-loader/artist-loader";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const userStatus = useSelector((state) => state.auth.status);
  const [isLoading, setIsLoading] = useState(true);
  const artistService = useArtist();
  // const [expireTime, setExpireTime] = useState("");

  // useEffect(() => {
  //   getExpireTimeById();
  // }, []);

  // useEffect(() => {
  //   const resetToken = async () => {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BACKEND_API}/auth/reset-token`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //         body: JSON.stringify({ expireTime: expireTime }),
  //       }
  //     );
  //     const data = await response.json();
  //     localStorage.setItem("accessToken", data.data);
  //   };

  //   if (expireTime) {
  //     resetToken();
  //   }
  // }, [expireTime, location]);

  // useEffect(() => {
  //   setInterval(() => {
  //     const token = getItemFromCurrentSession(AuthEnum.TOKEN);
  //     if (token && isJwtExpired(token)) {
  //       dispatch(logout());
  //       navigate("/login");
  //     }
  //   }, 3000);
  // }, []);
  //comminted

  useEffect(() => {
    const token = getItemFromCurrentSession(AuthEnum.TOKEN);
    if (token) {
      fetchSpotifyToken();
      dispatch(me());
    } else {
      setIsLoading(false);
      const urlPrefix = location.pathname.split("/")[1];
      if (urlPrefix === "blig") {
        destroySpotifySession();
        navigate("/login");
      }
    }
  }, []);

  useEffect(() => {
    if (userStatus === "succeeded" || userStatus === "failed") {
      setIsLoading(false);
    }
  }, [userStatus]);

  useEffect(() => {
    if (userStatus === "succeeded") {
      if (!user) {
        navigate("/login");
      } else {
        const urlPrefix = location.pathname.split("/")[1];
        if (urlPrefix !== "blig" && user.role !== "artist") {
          navigate("/blig/home");
        } else if (urlPrefix !== "blig" && user.role === "artist") {
          axios
            .get(
              `${URLconfig.BASE_URL}/artists/filter/get-artist-by-spotify/${user.meta_data?.spotify_id}`
            )
            .then(async (artist) => {
              if (artist.data.data) {
                navigate(`/blig/view-artist/${artist.data.data._id}`);
              } else {
                let payload = {
                  name: user.meta_data?.name,
                  spotify_id: user.meta_data?.spotify_id,
                  avatar: user.meta_data?.avatar,
                  genres: user.meta_data?.genres,
                };
                await artistService.post(payload);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          if (location.search) {
            navigate(`${location.pathname}${location.search}`);
          } else {
            navigate(location.pathname);
          }
        }
      }
    }

    // else if (userStatus === "failed") {
    //   destroySpotifySession();
    //   navigate("/login");
    // }
  }, [user, userStatus]);

  // const getExpireTimeById = async () => {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_BACKEND_API}/setting/64106cb98f8da03d6a6d6b07`
  //   );
  //   const data = await response.json();
  //   setExpireTime(data.data[0].expireTime);
  // };

  const fetchSpotifyToken = async () => await _fetchToken();

  if (artistService.isLoading) {
    return <ArtistPreLoader />;
  }

  return (
    <React.Fragment>
      {isLoading ? <PreLoader /> : <Navigation />}
    </React.Fragment>
  );
}

export default App;
