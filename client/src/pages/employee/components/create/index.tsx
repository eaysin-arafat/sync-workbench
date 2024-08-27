import Checkbox from "@/component/ui/form-elements/checkbox";
import DateInput from "@/component/ui/form-elements/date-input";
import Input from "@/component/ui/form-elements/input";
import MultiSelect from "@/component/ui/form-elements/multi-step";
import Select from "@/component/ui/form-elements/select";
import { PostEmployeeRequest } from "@/constants/api-interface/employee";
import { useCreateEmployeeMutation } from "@/features/employee/employee-api";
import { useFindUsersQuery } from "@/features/users/users-api";
import { Button } from "@mantine/core";
import { useState } from "react";

export type EmployeeFormType = {
  date_of_hire: Date | null;
  department_id?: string;
  position_id?: string;
  salary?: number;
  employment_status?: string;
  employee_status?: string;
  is_internship?: boolean;
  attendances?: string[];
  documents?: string[];
  manager_id?: string;
  departments?: string[];
  projects?: string[];
  tasks?: string[];
  leaves?: string[];
  performance_reviews?: string[];
  payrolls?: string[];
  user_info?: string;
};

const initialState: EmployeeFormType = {
  date_of_hire: null,
  department_id: "",
  position_id: "",
  salary: 0,
  employment_status: "",
  employee_status: "",
  is_internship: false,
  manager_id: "",
  departments: [],
  projects: [],
  tasks: [],
  attendances: [],
  documents: [],
  leaves: [],
  performance_reviews: [],
  payrolls: [],
  user_info: "",
};

const CreateEmployee = ({ onClose }: { onClose: () => void }) => {
  const [formState, setFormState] = useState<EmployeeFormType>({
    ...initialState,
  });
  const [createEmployee, { data: createEmployeeRes }] =
    useCreateEmployeeMutation();
  const { data: users } = useFindUsersQuery(undefined);

  const userOptions = users?.map((user) => ({
    value: String(user?.id),
    label: user?.username,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string) => (data: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: data,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: PostEmployeeRequest = {
      ...formState,
      department_id: Number(formState?.department_id),
      position_id: Number(formState?.position_id),
      user_info: Number(formState?.user_info),
      attendances: formState?.attendances?.map((attendance) =>
        Number(attendance)
      ),
      documents: formState?.documents?.map((document) => Number(document)),
      manager_id: Number(formState?.manager_id),
      departments: formState?.departments?.map((department) =>
        Number(department)
      ),
      projects: formState?.projects?.map((project) => Number(project)),
      tasks: formState?.tasks?.map((task) => Number(task)),
      leaves: formState?.leaves?.map((leave) => Number(leave)),
      performance_reviews: formState?.performance_reviews?.map(
        (performance_review) => Number(performance_review)
      ),
      payrolls: formState?.payrolls?.map((payroll) => Number(payroll)),
    };

    createEmployee({ data: payload });
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <>
            <h1 className="mt-4 font-medium text-xl">Personal Information</h1>

            <div className="grid md:grid-cols-2 items-center justify-normal md:justify-center gap-5">
              <Select
                label="Identify User"
                value={formState.user_info}
                onChange={handleSelectChange("user_info")}
                options={userOptions || undefined}
              />

              <DateInput
                label="Date of Hire"
                name="date_of_hire"
                type="date"
                value={formState.date_of_hire || undefined}
                onChange={(date) =>
                  setFormState((prev) => ({ ...prev, date_of_hire: date }))
                }
              />

              <Input
                label="Department"
                name="department_id"
                type="text"
                value={formState.department_id || ""}
                onChange={handleChange}
              />

              <Input
                label="Position"
                name="position_id"
                type="text"
                value={formState.position_id || ""}
                onChange={handleChange}
              />

              <Input
                label="Salary"
                name="salary"
                type="number"
                value={formState.salary}
                onChange={handleChange}
              />

              <Select
                label="Employment Status"
                name="employment_status"
                value={formState.employment_status}
                onChange={handleSelectChange("employment_status")}
                options={["Internship", "Trading", "Provisional", "Permanent"]}
              />

              <Select
                label="Employee Status"
                name="employee_status"
                value={formState.employee_status}
                onChange={handleSelectChange("employee_status")}
                options={["Active", "Inactive"]}
              />

              <Checkbox
                label="Is Internship"
                name="is_internship"
                value={formState.is_internship}
                onChange={handleChange}
              />
            </div>
          </>

          <>
            <h1 className="my-4 mt-8 font-medium text-xl">
              Work Relationships
            </h1>

            <div className="grid grid-cols-2 gap-5">
              <Select
                label="Manager"
                name="manager_id"
                value={formState.manager_id || ""}
                options={userOptions}
                onChange={handleSelectChange("manager_id")}
              />

              <MultiSelect
                label="Departments"
                name="departments"
                value={formState.departments}
                onChange={handleSelectChange("departments")}
              />
              <MultiSelect
                label="Projects"
                name="projects"
                value={formState.projects}
                onChange={handleSelectChange("projects")}
              />
              <MultiSelect
                label="Tasks"
                name="tasks"
                value={formState.tasks}
                onChange={handleSelectChange("tasks")}
              />
            </div>
          </>

          <>
            <h1 className="my-4 mt-8 font-medium text-xl">Employee Records</h1>

            <div className="grid grid-cols-2 gap-5">
              <MultiSelect
                label="Attendances"
                name="attendances"
                value={formState.attendances}
                onChange={handleSelectChange("attendances")}
                options={[]}
              />

              <MultiSelect
                label="Documents"
                name="documents"
                value={formState.documents}
                onChange={handleSelectChange("documents")}
              />

              <MultiSelect
                label="Leaves"
                name="leaves"
                value={formState.leaves}
                onChange={handleSelectChange("leaves")}
              />
              <MultiSelect
                label="Performance Reviews"
                name="performance_reviews"
                value={formState.performance_reviews}
                onChange={handleSelectChange("performance_reviews")}
              />

              <MultiSelect
                label="Payrolls"
                name="payrolls"
                value={formState.payrolls}
                onChange={handleSelectChange("payrolls")}
              />
            </div>
          </>

          <div className="flex items-center gap-5 justify-end py-2">
            <Button type="submit">Submit</Button>
            <Button variant="default" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateEmployee;
