import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppStateType } from "../../Config/Redux/configureStore";
import { LoginDto, UserDto, ChangePasswordDto } from "../../Dto/userDto";
import { UserEnterTriesState } from "./userSlice";
import bcrypt from "bcryptjs";

export interface TryLoginReturnType {
  enterTries: UserEnterTriesState;
  currentUser: UserDto;
  error?: string;
}

export const tryLogin = createAsyncThunk(
  `user/tryLogin`,
  async (data: LoginDto, { rejectWithValue, fulfillWithValue, getState }) => {
    const { user } = getState() as AppStateType;
    let newEnterTry: UserEnterTriesState = Object.assign({}, user.enterTries);
    if (newEnterTry && newEnterTry.email === data.email) {
      if (
        newEnterTry.lastTry &&
        Date.now() -
          new Date(JSON.stringify(newEnterTry.lastTry)).getMilliseconds() >
          10 * 60 * 1000
      ) {
        newEnterTry.tries = 0;
      }
      newEnterTry.tries = newEnterTry.tries + 1;
      newEnterTry.lastTry = new Date();
    } else
      newEnterTry = {
        email: data.email,
        tries: 1,
        lastTry: new Date(),
      };

    if (newEnterTry.tries > 5) {
      rejectWithValue({
        enterTries: newEnterTry,
        currentUser: null,
        error: "Превышено количество попыток входа, попробуйте позже",
      });
    } else {
      const currentUser = user.users.find(
        (x) =>
          x.email == data.email &&
          x.passHash ==
            bcrypt.hashSync(data.password, "$2a$10$CwTycUXWue0Thq9StjUM0u")
      );
      if (!currentUser) {
        rejectWithValue({
          enterTries: newEnterTry,
          currentUser: null,
          error: "Пользователь с таким эл. адресом и паролем не найден.",
        });
      }
      return {
        enterTries: {
          email: data.email,
          tries: 0,
          lastTry: new Date(),
        },
        currentUser: currentUser,
      };
    }
  }
);
export const tryChangePassword = createAsyncThunk(
  "user/tryChangePassword",
  async (data: ChangePasswordDto, { rejectWithValue, getState }) => {
    const { user } = getState() as AppStateType;
    let currentUser = user.users.find((x) => x.email === data.email);
    if (currentUser) {
      currentUser.passHash = bcrypt.hashSync(
        data.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      return currentUser;
    } else {
      rejectWithValue("Не найден пользователь с указанным почтовым адесом");
    }
  }
);
