import showToast from "@/component/ui/alert-message";
import Input from "@/component/ui/form-elements/input";
import MultiSelect from "@/component/ui/form-elements/multi-step";
import Select from "@/component/ui/form-elements/select";
import { useCreateDepartmentMutation } from "@/features/department/department-api";
import { useReadEmployeesQuery } from "@/features/employee/employee-api";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

type CreateDepartmentType = {
  department_name: string;
  description: string;
  location: string;
  manager_id: string;
  employees: string[];
  projects: string[];
};

const initialState: CreateDepartmentType = {
  department_name: "",
  description: "",
  location: "",
  manager_id: "",
  projects: [],
  employees: [],
};

const CreateDepartment = ({ onClose }: { onClose: () => void }) => {
  const [formState, setFormState] = useState<CreateDepartmentType>({
    ...initialState,
  });

  const [createDepartment, { isError, isSuccess, error }] =
    useCreateDepartmentMutation();
  const { data: employees } = useReadEmployeesQuery();
  const employeesOptions = employees?.data?.map((employee) => ({
    value: String(employee?.id),
    label: employee?.attributes?.user_info?.data?.attributes?.username,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
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
    createDepartment({
      data: {
        ...formState,
        employees: formState?.employees?.map((employee) => Number(employee)),
        manager_id: Number(formState?.manager_id),
        projects: formState?.projects?.map((project) => Number(project)),
      },
    });
  };

  useEffect(() => {
    if (isError) {
      showToast({ type: "error", message: "Error creating department" });
    }

    if (isSuccess) {
      showToast({
        type: "success",
        message: "Department has been Created successfully",
      });

      onClose();
      setFormState(initialState);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-5">
          <Input
            label="Name"
            name="department_name"
            type="text"
            value={formState.department_name}
            onChange={handleChange}
          />

          <Input
            label="Description"
            name="description"
            type="text"
            value={formState.description || ""}
            onChange={handleChange}
          />

          <Input
            label="Location"
            name="location"
            type="text"
            value={formState.location || ""}
            onChange={handleChange}
          />

          <Select
            value={formState?.manager_id}
            label="Add Manager"
            onChange={handleSelectChange("manager_id")}
            options={employeesOptions}
          />

          <MultiSelect
            value={formState?.projects}
            label="Add Project"
            onChange={handleSelectChange("projects")}
          />

          <MultiSelect
            label="Add New Employee"
            name="employees"
            placeholder="Search New Employee"
            value={formState?.employees}
            onChange={handleSelectChange("employees")}
            options={employeesOptions}
          />
        </div>
        <div className="flex items-center gap-5 justify-end py-2 pt-5">
          <Button type="submit">Submit</Button>
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateDepartment;
