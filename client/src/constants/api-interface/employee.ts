import { ReferenceResponse } from "./root";
import { User } from "./user";

export interface EmployeeType {
  date_of_hire: string;
  department_id: ReferenceType;
  position_id: ReferenceType;
  salary: string;
  employment_status: string;
  employee_status: string;
  is_internship: boolean;
  attendances: ReferenceType;
  documents: ReferenceType;
  manager_id: ReferenceType;
  employee: ReferenceType;
  departments: ReferenceType;
  projects: ReferenceType;
  tasks: ReferenceType;
  leaves: ReferenceType;
  performance_reviews: ReferenceType;
  payrolls: ReferenceType;
  employee_skills: ReferenceType;
  employee_certifications: ReferenceType;
  user_info: ReferenceResponse<User>;
}

export interface ReferenceType {
  type: string;
  relation_with: string;
}

export type PostEmployeeRequest = {
  date_of_hire: Date | null;
  department_id?: number | null;
  position_id?: number | null;
  salary?: number;
  employment_status?: string;
  employee_status?: string;
  is_internship?: boolean;
  attendances?: number[];
  documents?: number[];
  manager_id?: number | null;
  departments?: number[];
  projects?: number[];
  tasks?: number[];
  leaves?: number[];
  performance_reviews?: number[];
  payrolls?: number[];
  user_info?: number | null;
};
