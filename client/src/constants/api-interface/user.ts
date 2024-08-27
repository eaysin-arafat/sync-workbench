export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  first_name: string;
  last_name: string;
  address: string;
  date_of_birth?: any;
  city: string;
  state: string;
  country: string;
  zip_code: number;
  phone_number: number;
  position_title: string;
}
