import { createSlice } from "@reduxjs/toolkit";
import { UserDto } from "../../Dto/userDto";
import {
  tryLogin,
  TryLoginReturnType,
  tryChangePassword,
} from "./userAsyncThunk";

export interface UserEnterTriesState {
  email: string;
  tries: number;
  lastTry: Date;
}
export interface UserState {
  currentUser?: UserDto;
  isFetching: boolean;
  users: UserDto[];
  operationSucceded?: boolean;
  error?: string;
  enterTries: UserEnterTriesState;
}

const initialState = {
  currentUser: undefined,
  isFetching: false,
  users: new Array<UserDto>(),
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.operationSucceded = false;
      const userDto = action.payload as UserDto;
      state.users.push(userDto);
      state.operationSucceded = true;
    },
    updateUser: (state, action) => {
      if (state.currentUser) {
        const index = state.users.indexOf(state.currentUser);
        if (index) {
          state.currentUser = action.payload as UserDto;
          state.users.splice(index, 1, state.currentUser);
          //state.users[index] = state.currentUser;
        } else {
          state.error = "Проблемы с обновление пользователя";
        }
      }
    },
    logoutUser: (state) => {
      state.currentUser = undefined;
    },
    clearUsers: (state) => {
      state.users = new Array<UserDto>();
    },
    clearError: (state) => {
      state.error = undefined;
    },

    clearOperationState(state) {
      state.operationSucceded = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(tryLogin.pending, (state) => {
        state.isFetching = true;
        state.operationSucceded = false;
      })
      .addCase(tryLogin.fulfilled, (state, action) => {
        state.isFetching = false;
        state.currentUser = (action.payload as TryLoginReturnType).currentUser;
        state.enterTries = (action.payload as TryLoginReturnType).enterTries;
        state.error = undefined;
        state.operationSucceded = true;
      })
      .addCase(tryLogin.rejected, (state, action) => {
        state.isFetching = false;
        state.enterTries = (action.payload as TryLoginReturnType).enterTries;
        state.error = (action.payload as TryLoginReturnType).error;
      })
      .addCase(tryChangePassword.pending, (state) => {
        state.operationSucceded = false;
      })
      .addCase(tryChangePassword.fulfilled, (state, action) => {
        const user = action.payload as UserDto;
        const userByEmail = state.users.find((u) => u.email === user.email);
        if (userByEmail) {
          const index = state.users.indexOf(userByEmail);
          state.users.splice(index, 1, user);
        }
        state.operationSucceded = true;
      })
      .addCase(tryChangePassword.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const userActions = {
  ...userSlice.actions,
  tryLogin,
  tryChangePassword,
};
export default userSlice.reducer;
