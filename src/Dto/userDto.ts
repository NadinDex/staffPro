export interface LoginDto {
  email: string;
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
  phone?: string;
  sex: string;
  avatar?: string;
  googleClientId?: string;
  slackClientId?: string;
  dropbox?: string;
}

export interface RegisterDto extends UserDto {
  password: string;
  passwordRepeat: string;
  userAgreement: boolean;
}

export interface ChangePasswordDto {
  email: string;
  password: string;
  passwordRepeat: string;
}
export interface ChangePasswordEmailDto {
  email: string;
}

export type sexType = "M" | "F";
