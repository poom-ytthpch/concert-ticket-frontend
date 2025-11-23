import client from "@/common/apollo/client";
import { CreateConcertMutation, GetConcertsQuery } from "@/gql/concert";
import {
  CreateConcertInput,
  CreateConcertResponse,
  GetConcertsInput,
  GetConcertsResponseResolvers,
  MutationCreateConcertArgs,
  QueryGetConcertsArgs,
} from "@/types/gql";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "./alert.slice";

type DefaultState = {
  loading: boolean;
  error: string | null;
};

const initialState: GetConcertsResponseResolvers & DefaultState = {
  loading: false,
  error: null,
  data: undefined,
  summary: undefined,
};

export const getConcerts = createAsyncThunk(
  "concert/getConcerts",
  async ({ take, skip, isAdmin }: GetConcertsInput, thunkAPI) => {
    try {
      thunkAPI.dispatch(
        showAlert({
          type: "loading",
          title: "Concert",
          message: "Loading ...",
        })
      );

      const res = await client.query<
        { getConcerts: GetConcertsResponseResolvers },
        QueryGetConcertsArgs
      >({
        query: GetConcertsQuery,
        variables: {
          input: { take, skip, isAdmin },
        },
      });

      if (!res.data) {
        thunkAPI.dispatch(
          showAlert({
            type: "error",
            title: "Concert",
            message: res.error?.message || "Internal server error",
          })
        );
        return thunkAPI.rejectWithValue(res.error?.message);
      }

      thunkAPI.dispatch(
        showAlert({
          type: "success",
          title: "Concert",
          message: "successful",
        })
      );

      return res;
    } catch (err: any) {
      thunkAPI.dispatch(
        showAlert({
          type: "error",
          title: "Concert",
          message: err.message || "Internal server error",
        })
      );

      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createConcert = createAsyncThunk(
  "concert/createConcert",
  async ({ totalSeats, name, description }: CreateConcertInput, thunkAPI) => {
    try {
      thunkAPI.dispatch(
        showAlert({
          type: "loading",
          title: "Concert",
          message: "Loading ...",
        })
      );

      const res = await client.mutate<
        { createConcert: CreateConcertResponse },
        MutationCreateConcertArgs
      >({
        mutation: CreateConcertMutation,
        variables: {
          input: { totalSeats, name, description },
        },
      });

      if (!res.data) {
        thunkAPI.dispatch(
          showAlert({
            type: "error",
            title: "Concert",
            message: res.error?.message || "Internal server error",
          })
        );
        return thunkAPI.rejectWithValue(res.error?.message);
      }

      thunkAPI.dispatch(
        showAlert({
          type: "success",
          title: "Concert",
          message: "successful",
        })
      );

      return res;
    } catch (err: any) {
      thunkAPI.dispatch(
        showAlert({
          type: "error",
          title: "Concert",
          message: err.message || "Internal server error",
        })
      );

      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const concertSlice = createSlice({
  name: "concert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConcerts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConcerts.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.data?.getConcerts) {
          state.data = payload.data.getConcerts.data;
          state.summary = payload.data.getConcerts.summary;
        }
      })
      .addCase(getConcerts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const {} = concertSlice.actions;

export const concertReducer = concertSlice.reducer;
