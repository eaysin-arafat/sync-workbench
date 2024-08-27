import Input from "@/component/ui/form-elements/input";
import Select from "@/component/ui/form-elements/select";
import DefaultModal from "@/component/ui/modal";
import PageHeader from "@/component/ui/page-header";
import CustomPagination from "@/component/ui/pagination/custom-pagination";
import { useReadEmployeesQuery } from "@/features/employee/employee-api";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreateEmployee from "./components/create";
import EmployeeTable from "./components/table/table";

const Employee = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: employees } = useReadEmployeesQuery();

  return (
    <div>
      <PageHeader
        pageTitle="Employee"
        hasAddButton
        btnLabel="Add New Employee"
        onClick={open}
      />

      <div className="grid md:grid-cols-4 items-center gap-2 pb-2 md:pb-4">
        <Input placeholder="Employee Id" height="40" />
        <Input placeholder="Employee Name" height="40" />
        <Select placeholder="Designation" height="40" />
        <Button variant="primary">Search</Button>
      </div>

      <EmployeeTable employees={employees?.data || []} />
      <CustomPagination />

      <DefaultModal
        size={"3xl"}
        opened={opened}
        onClose={close}
        title="Add Employee"
      >
        <CreateEmployee onClose={close} />
      </DefaultModal>
    </div>
  );
};

export default Employee;
