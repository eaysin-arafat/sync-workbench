export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  department: string;
  designation: string;
  dateOfJoining: string;
  status: string;
  phone: string;
  address?: any;
}
