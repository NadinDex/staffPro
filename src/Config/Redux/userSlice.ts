import { createSlice } from "@reduxjs/toolkit";
import {
  LoginDto,
  RegisterDto,
  UserDto,
  ChangePasswordDto,
} from "../../Dto/userDto";
import bcrypt from "bcryptjs";

export interface UserState {
  currentUser?: UserDto;
  users: UserDto[];
  isLoggedIn: boolean;
  isFetching: boolean;
  error?: string;
  enterTries: {
    email: string;
    tries: number;
    lastTry: Date;
  };
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
      const user = action.payload as RegisterDto;
      let userDto = {
        id:
          state.users && state.users.length > 0
            ? Math.max(...state.users.map((x) => x.id)) + 1
            : 1,
        passHash: bcrypt.hashSync(
          user.password,
          "$2a$10$CwTycUXWue0Thq9StjUM0u"
        ),
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        fatherName: user.fatherName,
        bDate: user.bDate,
        bMonth: user.bMonth,
        bYear: user.bYear,
        phone: user.phone,
        sex: user.sex,
      } as UserDto;

      state.users.push(userDto);
    },
    updateUser: (state, action) => {
      if (state.currentUser) {
        const index = state.users.indexOf(state.currentUser);
        if (index) {
          state.currentUser = action.payload as UserDto;
          state.users.splice(index, 1, state.currentUser);
          state.users[index] = state.currentUser;
        } else {
          state.error = "Update user problem";
        }
      }
    },
    loginUser: (state, action) => {
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
    },
    logoutUser: (state) => {
      state.currentUser = undefined;
    },
    crearUsers: (state) => {
      state.users = new Array<UserDto>();
    },
    clearError: (state) => {
      state.error = undefined;
    },
    chengePassword: (state, action) => {
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
    },
  },
});

export const userActions = { ...userSlice.actions };
export default userSlice.reducer;
