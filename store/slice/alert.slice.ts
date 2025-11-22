import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AlertType = "success" | "info" | "warning" | "error" | "loading";

interface AlertState {
  type: AlertType | null;
  message: string | null;
  loading: boolean;
  title: string | null;
}

const initialState: AlertState = {
  type: null,
  message: null,
  loading: false,
  title: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{ type: AlertType; message: string; title: string }>
    ) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.title = action.payload.title;
    },
    clearAlert: (state) => {
      state.type = null;
      state.message = null;
      state.title = null;
    },
  },
  extraReducers: () => {},
});

export const { showAlert, clearAlert } = alertSlice.actions;

export const alertReducer = alertSlice.reducer;
