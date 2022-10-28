import { createSlice } from "@reduxjs/toolkit";
import { LoginDto, RegisterDto, UserDto } from "../../Dto/userDto";
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
        id: state.users ? Math.max(...state.users.map((x) => x.id)) : 1,
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
        state.currentUser = action.payload as UserDto;
        state.users[index] = state.currentUser;
      }
    },
    loginUser: (state, action) => {
      state.currentUser = state.users.find(
        (x) =>
          x.email == (action.payload as LoginDto).email &&
          x.passHash ==
            bcrypt.hashSync(
              (action.payload as LoginDto).password,
              "$2a$10$CwTycUXWue0Thq9StjUM0u"
            )
      );
      if (!state.currentUser)
        state.error = "Пользователь с таким эл. адресом и паролем не найден.";
      if (
        state.enterTries &&
        state.enterTries.email === (action.payload as LoginDto).email
      ) {
        state.enterTries.tries += 1;
        if (state.enterTries.tries >= 5)
          state.error = "Превышено количество попыток входа, попробуйте позже";
      } else
        state.enterTries = {
          email: (action.payload as LoginDto).email,
          tries: 1,
        };
    },
    logoutUser: (state) => {
      state.currentUser = undefined;
    },
    crearUsers: (state) => {
      state.users = new Array<UserDto>();
    },
  },
});

export const userActions = { ...userSlice.actions };
export default userSlice.reducer;
