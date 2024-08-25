import Breadcrumb from "@/component/shared/breadcrumbs";
import CustomPagination from "@/component/shared/pagination/custom-pagination";
import Input from "@/component/ui/form-elements/input";
import Select from "@/component/ui/form-elements/select";
import { Button } from "@mantine/core";
import Table from "./components/table";

const Employee = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-5">
        <Breadcrumb pageName="Employee" />

        <Button variant="primary">Add New Employee</Button>
      </div>

      <div className="grid md:grid-cols-4 items-center gap-2 pb-2 md:pb-4">
        <Input placeholder="Employee Id" height="40" />
        <Input placeholder="Employee Name" height="40" />
        <Select placeholder="Designation" height="40" />
        <Button variant="primary">Search</Button>
      </div>

      <Table />
      <CustomPagination />
    </div>
  );
};

export default Employee;
