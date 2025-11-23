import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../common/apollo/client";
import { showAlert } from "./alert.slice";
import { decode } from "jsonwebtoken";
import {
  LoginInput,
  LoginResponse,
  MutationLoginArgs,
  MutationRegisterUserArgs,
  RegisterUserInput,
  RegisterUserResponse,
} from "@/types/gql";
import { LoginMutation, RegisterUserMutation } from "@/gql/auth";
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
          message: err.message || "Internal server error",
        })
      );

      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    { email, password, username, confirmPassword }: RegisterUserInput,
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(
        showAlert({
          type: "loading",
          title: "Register",
          message: "Registering ...",
        })
      );
      const res = await client.mutate<
        { registerUser: RegisterUserResponse },
        MutationRegisterUserArgs
      >({
        mutation: RegisterUserMutation,
        variables: {
          input: { email, password, username, confirmPassword },
        },
      });
      if (!res.data?.registerUser.status) {
        thunkAPI.dispatch(
          showAlert({
            type: "error",
            title: "Register",
            message: res.data?.registerUser.message || "Register failed",
          })
        );

        return thunkAPI.rejectWithValue(res.data?.registerUser.message);
      }
      thunkAPI.dispatch(
        showAlert({
          type: "success",
          title: "Register",
          message: res.data?.registerUser.message || "Register successful",
        })
      );
      return res;
    } catch (err: any) {
      console.log({ err });
      thunkAPI.dispatch(
        showAlert({
          type: "error",
          title: "Register",
          message: err.message || "Internal server error",
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
    switchUser(state) {
      const isUserAdmin =
        state.user?.roles.includes("ADMIN") &&
        state.user.roles.includes("USER");
      if (state.user && isUserAdmin) {
        state.user = {
          ...state.user,
          isAdmin: !state.user.isAdmin,
        };
      }
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
            isAdmin: decodedToken.payload.userInfo.roles.includes("ADMIN"),
            mobile: decodedToken.payload.userInfo.mobile,
            roles: decodedToken.payload.userInfo.roles,
            username: decodedToken.payload.userInfo.username,
            email: decodedToken.payload.userInfo.email,
            id: decodedToken.payload.userInfo.id,
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

export const { logout, switchUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
