export interface LoginDto {
  login: string;
  password: string;
}

export interface UserDto {
  id: number;
  email: string;
  passHash: string;
  lastName: string;
  firstName: string;
  fatherName: string;
  bDate: number;
  bMonth: number;
  bYear: number;
  phone: string;
  sex: string;
}

export interface RegisterDto extends UserDto {
  password: string;
  passwordRepeat: string;
  userAgreement: boolean;
}

export interface EditUserDto extends UserDto {
  password: string;
  passwordRepeat: string;
  userAgreement: boolean;
}

export type sexType = "M" | "F";
