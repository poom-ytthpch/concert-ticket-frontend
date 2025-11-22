import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export type AppThunk<ReturnType = void> = (
  thunkAPI: AppThunkConfig
) => Promise<ReturnType>;
