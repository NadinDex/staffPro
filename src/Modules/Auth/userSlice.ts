import { createSlice } from "@reduxjs/toolkit";
import {
  LoginDto,
  RegisterDto,
  UserDto,
  ChangePasswordDto,
} from "../../Dto/userDto";
import bcrypt from "bcryptjs";
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
    /*loginUser: (state, action) => {
      if (
        state.enterTries &&
        state.enterTries.email === (action.payload as LoginDto).email
      ) {
        if (
          state.enterTries.lastTry &&
          Date.now() - state.enterTries.lastTry.getMilliseconds() >
            10 * 60 * 1000
        ) {
          state.enterTries.tries = 0;
        }
        state.enterTries.tries += 1;
        state.enterTries.lastTry = new Date();
        if (state.enterTries.tries > 5)
          state.error = "Превышено количество попыток входа, попробуйте позже";
      } else
        state.enterTries = {
          email: (action.payload as LoginDto).email,
          tries: 1,
          lastTry: new Date(),
        };

      if (state.enterTries.tries <= 5) {
        state.currentUser = state.users.find(
          (x) =>
            x.email == (action.payload as LoginDto).email &&
            x.passHash ==
              bcrypt.hashSync(
                (action.payload as LoginDto).password,
                "$2a$10$CwTycUXWue0Thq9StjUM0u"
              )
        );
        if (!state.currentUser) {
          state.error = "Пользователь с таким эл. адресом и паролем не найден.";
        }
      }
    },*/
    logoutUser: (state) => {
      state.currentUser = undefined;
    },
    clearUsers: (state) => {
      state.users = new Array<UserDto>();
    },
    clearError: (state) => {
      state.error = undefined;
    },
    /*changePassword: (state, action) => {
      const user = state.users.find(
        (x) => x.email === (action.payload as ChangePasswordDto).email
      );
      if (user) {
        const index = state.users.indexOf(user);
        user.passHash = bcrypt.hashSync(
          (action.payload as ChangePasswordDto).password,
          "$2a$10$CwTycUXWue0Thq9StjUM0u"
        );
        state.users[index] = { ...user };
      }
    },*/
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
        state.enterTries = (action.payload as TryLoginReturnType).enterTries;
        state.currentUser = (action.payload as TryLoginReturnType).currentUser;
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
