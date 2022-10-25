import { rootReducer } from "./rootReducer";
import thunkMiddleware from "redux-thunk";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

export const customConfigureStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type InferActionsTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;
