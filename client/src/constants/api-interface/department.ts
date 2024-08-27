import { EmployeeType } from "./employee";
import { MultipleEntityAttributes, SingleEntityAttributes } from "./root";

export interface DepartmentType {
  department_name: string;
  description?: string;
  location?: string;
  projects?: number[];
  manager_id: SingleEntityAttributes<EmployeeType>;
  employees?: MultipleEntityAttributes<EmployeeType>;
}
