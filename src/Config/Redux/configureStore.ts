import { rootReducer } from "./rootReducer";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { localStorageName } from "../../Common/Constants/names";
import { initialClients } from "../../Common/Constants/clients";

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

const getClients = async () => {
  try {
    const res = await fetch("localhost:3002");
    return await res.json();
  } catch (e) {}
};

const getInitialState = () => {
  try {
    const data = JSON.parse(localStorage.getItem(localStorageName)! ?? {});
    return data as PreloadedState<RootReducerType>;
  } catch (e) {
    return undefined;
  }
};

export const customConfigureStore = () => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: getInitialState(),
  });
};
