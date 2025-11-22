import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../common/apollo/client";
import { showAlert } from "./alert.slice";
import { decode } from "jsonwebtoken";
import { LoginInput, LoginResponse, MutationLoginArgs } from "@/types/gql";
import { LoginMutation } from "@/gql/auth";
import Cookies from "js-cookie";
import { AuthState, DecodedToken } from "@/types/auth/auth";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginInput, thunkAPI) => {
    try {
      thunkAPI.dispatch(
        showAlert({
          type: "loading",
          title: "Login",
          message: "Logging ...",
        })
      );

      const res = await client.mutate<
        { login: LoginResponse },
        MutationLoginArgs
      >({
        mutation: LoginMutation,
        variables: {
          input: { email, password },
        },
      });

      if (!res.data?.login.status) {
        thunkAPI.dispatch(
          showAlert({
            type: "error",
            title: "Login",
            message: res.data?.login.message || "Login failed",
          })
        );

        return thunkAPI.rejectWithValue(res.data?.login.message);
      }

      thunkAPI.dispatch(
        showAlert({
          type: "success",
          title: "Login",
          message: res.data?.login.message || "Login successful",
        })
      );

      return res;
    } catch (err: any) {
      thunkAPI.dispatch(
        showAlert({
          type: "error",
          title: "Login",
          message: "Internal server error",
        })
      );

      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.data?.login?.token) {
          const decodedToken = decode(payload.data.login.token) as DecodedToken;
          state.user = {
            mobile: decodedToken.payload.userInfo.mobile,
            roles: decodedToken.payload.userInfo.roles,
          };
          state.token = payload.data.login.token;
          Cookies.set("token", payload.data.login.token);
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
        state.token = null;
        Cookies.remove("token");
      });
  },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
