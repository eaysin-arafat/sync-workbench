interface SignInDataType {
  username: string;
  email: string;
  confirmed: boolean;
  first_name: string;
  last_name: string;
  date_of_birth: Date | null;
  password: string;
  re_enter_password: string;
}
