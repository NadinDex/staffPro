import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginDto, RegisterDto, UserDto } from "../../Dto/userDto";
import bcrypt from "bcryptjs";

interface UserState {
  currentUser?: UserDto;
  users: UserDto[];
  isLoggedIn: boolean;
  isFetching: boolean;
  error?: string;
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
      let userDto = user as UserDto;
      userDto.id = state.users ? Math.max(...state.users.map((x) => x.id)) : 1;
      userDto.passHash = bcrypt.hashSync(
        user.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      state.users.push(userDto);
    },
    updateUser: (state, action) => {
      if (state.currentUser) {
        state.currentUser = action.payload as UserDto;
        //TODO
      }
    },
    loginUser: (state, action) => {
      state.currentUser = state.users.find(
        (x) => x.email == (action.payload as UserDto).email
      );
    },
  },
});

export const userActions = { ...userSlice.actions };
export default userSlice.reducer;
