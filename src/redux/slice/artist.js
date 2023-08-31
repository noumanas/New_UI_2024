import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import clients, { thunkHandler } from "../../services/api";

import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  artists: null,
  myArtists: null,
  artist: null,
  totalFunding: 0,
  customizeFunding: 0,
  tracks: [],
  totalTracks: 0,
  selectedTracksCount: 0,
  selectedTracks: [],
  searchTracks: [],
  newMusicTracks: [],
  isLoading: true,
  showCustomizeFunding: false,
  showSelectedTracksFunding: false,
  reload: false,
  reports: [],
};

// export const addReport = createAsyncThunk("artist/getArtist", (_, thunkAPI) => {
//   const response = thunkHandler(
//     clients.default.client({
//       method: "GET",
//       url: "/artists",
//     }),
//     thunkAPI
//   );
//   return response;
// });

export const getReports = createAsyncThunk(
  "artist/getReports",
  (spotify_id, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "GET",
        url: `/artist-royalities-history/${spotify_id}`,
      }),
      thunkAPI
    );
    return response;
  }
);

export const deleteReport = createAsyncThunk(
  "artist/deleteReport",
  (report_id, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "DELETE",
        url: `/artist-royalities-history/${report_id}`,
      }),
      thunkAPI
    );
    return response;
  }
);

export const getArtist = createAsyncThunk("artist/getArtist", (_, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "GET",
      url: "/artists",
    }),
    thunkAPI
  );
  return response;
});

export const getMyArtist = createAsyncThunk(
  "artist/getMyArtist",
  (_, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "GET",
        url: "/artists/myArtist/current/list",
      }),
      thunkAPI
    );
    return response;
  }
);
export const addToMyArtist = createAsyncThunk(
  "artist/addToMyArtist",
  ({ id }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "GET",
        url: `/artists/addToMyArtist/${id}`,
      }),
      thunkAPI
    );
    return response;
  }
);
export const getArtistById = createAsyncThunk(
  "artist/getArtistById",
  ({ id }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "GET",
        url: `/artists/${id}`,
      }),
      thunkAPI
    );
    return response;
  }
);
export const addArtist = createAsyncThunk(
  "artist/addArtist",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "POST",
        url: "/artists",
        data,
      }),
      thunkAPI
    );
    return response;
  }
);
export const addArtistWithImage = createAsyncThunk(
  "artist/addArtist",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "POST",
        url: "/artists/profile",
        data,
      }),
      thunkAPI
    );
    return response;
  }
);

export const updateArtist = createAsyncThunk(
  "artist/updateArtist",
  ({ id, data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "PUT",
        url: `/artists/${id}`,
        data,
      }),
      thunkAPI
    );
    return response;
  }
);

export const updateArtistWithProfile = createAsyncThunk(
  "artist/updateArtistWithProfile",
  ({ id, data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "PUT",
        url: `/artists/profile/update/${id}`,
        data,
      }),
      thunkAPI
    );
    return response;
  }
);

export const getTracks = createAsyncThunk(
  "artist/tracks",
  (spotify_id, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "GET",
        url: `/artist-tracks/${spotify_id}`,
      }),
      thunkAPI
    );
    return response;
  }
);

export const deleteArtist = createAsyncThunk(
  "artist/deleteArtist",
  ({ id }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "DELETE",
        url: `/artists/${id}`,
      }),
      thunkAPI
    );
    return response;
  }
);

export const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    emptySingularArtist: (state, action) => {
      state.artist = null;
    },
    setTotalFunding: (state, action) => {
      state.totalFunding = action.payload;
    },
    setCustomizeFunding: (state, action) => {
      state.customizeFunding = action.payload;
    },
    setShowCustomizeFundingUI: (state, action) => {
      state.showCustomizeFunding = action.payload;
    },
    setShowSelectedTracksFunding: (state, action) => {
      state.showSelectedTracksFunding = action.payload;
    },
    setTotalTracks: (state, action) => {
      state.totalTracks = action.payload;
    },
    setSelectedTrackCount: (state, action) => {
      state.selectedTracksCount = action.payload;
    },
    setSelectedTracks: (state, action) => {
      state.selectedTracks = action.payload;
    },
    setNewMusicTracks: (state, action) => {
      state.newMusicTracks = action.payload;
    },
    setSearchResultTracks: (state, action) => {
      state.searchTracks = action.payload;
    },
    makeEmptySearchResultTracks: (state, action) => {
      state.searchTracks = [];
    },
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
  },
  extraReducers: {
    [getArtist.pending]: (state) => {
      state.status = "loading";
    },
    [getArtist.fulfilled]: (state, action) => {
      state.artists = action.payload.data;
      state.status = "succeeded";
    },
    [getArtist.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
    [getMyArtist.pending]: (state) => {
      state.status = "loading";
    },
    [getMyArtist.fulfilled]: (state, action) => {
      state.myArtists = action.payload.data;
      state.status = "succeeded";
    },
    [getMyArtist.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
    [addArtist.pending]: (state) => {
      state.status = "loading";
    },
    [addArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
      toast.success("Artist Added Successfully");
    },
    [addArtist.rejected]: (state, action) => {
      if (
        action.payload.data?.message === "user created relation with artist"
      ) {
        state.status = "succeeded";
        toast.success("Artist Added Successfully");
      } else {
        state.status = "failed";
        toast.error(action.payload.data.message);
      }
    },
    [getArtistById.pending]: (state) => {
      state.status = "loading";
    },
    [getArtistById.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.artist = action.payload.data;
    },
    [getArtistById.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
    [updateArtist.pending]: (state) => {
      state.status = "loading";
    },
    [updateArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
      toast.success("Artist Updated Successfully");
    },
    [updateArtist.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
    [updateArtistWithProfile.pending]: (state) => {
      state.status = "loading";
    },
    [updateArtistWithProfile.fulfilled]: (state, action) => {
      state.status = "succeeded";
      toast.success("Artist Updated Successfully");
    },
    [updateArtistWithProfile.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
    [addToMyArtist.pending]: (state) => {
      state.status = "loading";
    },
    [addToMyArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
      toast.success("Artist added to my artist successfully");
    },
    [addToMyArtist.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
    [deleteArtist.pending]: (state) => {
      state.status = "loading";
    },
    [deleteArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
      toast.success("Artist Deleted Successfully");
    },
    [deleteArtist.rejected]: (state, action) => {
      state.status = "failed";
      toast.error(action.payload.data.message);
    },
    [getReports.pending]: (state) => {
      state.status = "loading";
    },
    [getReports.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.reports = action.payload.data;
    },
    [getReports.rejected]: (state) => {
      state.status = "failed";
    },
    [deleteReport.fulfilled]: (state, action) => {
      state.reports = state.reports.filter(
        (e) => e._id !== action.payload.data._id
      );
      toast.success("Report Deleted Successfully");
    },
  },
});

export const {
  setTotalFunding,
  setTotalTracks,
  setIsLoading,
  setSelectedTrackCount,
  setSelectedTracks,
  setTracks,
  emptySingularArtist,
  setReload,
  setShowSelectedTracksFunding,
  setSearchResultTracks,
  makeEmptySearchResultTracks,
  setNewMusicTracks,
} = artistSlice.actions;

export default artistSlice.reducer;
