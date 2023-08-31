import axios from "axios";
import { config } from "../enviorment/enviorment";

const defaultClient = axios.create({
  baseURL: config.BASE_URL,
  timeout: 100000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const clients = {
  default: {
    client: defaultClient,
  },
};

/** Middleware to extract API error details from response */
export const thunkHandler = async (asyncFn, thunkAPI) => {
  try {
    const response = await asyncFn;
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
};

export default clients;
