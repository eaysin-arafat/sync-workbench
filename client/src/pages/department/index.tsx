import Input from "@/component/ui/form-elements/input";
import DefaultModal from "@/component/ui/modal";
import PageHeader from "@/component/ui/page-header";
import CustomPagination from "@/component/ui/pagination/custom-pagination";
import { useReadDepartmentsQuery } from "@/features/department/department-api";
import { QueryParams } from "@/utils/get-query-params";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import CreateDepartment from "./create";
import DepartmentTable from "./table/table";

const Department = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [searchParams, setSearchParams] = useState({
    departmentId: "",
    departmentName: "",
  });

  const queryParams: QueryParams = {
    sort: ["department_name:asc"],
    populate: {
      employees: {
        populate: {
          user_info: {
            fields: ["username"],
          },
        },
      },
      manager: {
        populate: {
          user_info: {
            fields: ["username", "avatar"],
          },
        },
      },
    },
    filters: {
      department_id: {
        $eq: searchParams.departmentId || undefined,
      },
      department_name: {
        $contains: searchParams.departmentName || undefined,
      },
    },
  };

  const { data: departments } = useReadDepartmentsQuery(queryParams);

  return (
    <div>
      <PageHeader
        pageTitle="Department"
        hasAddButton
        btnLabel="Add New Department"
        onClick={open}
      />

      <div className="grid md:grid-cols-3 items-center gap-2 pb-2 md:pb-4">
        <Input placeholder="Department Id" height="40" />
        <Input placeholder="Department Name" height="40" />
        <Button variant="primary">Search</Button>
      </div>

      <DepartmentTable departments={departments?.data || []} />
      <CustomPagination />

      <DefaultModal
        size={"2xl"}
        opened={opened}
        onClose={close}
        title="Add Department"
      >
        <CreateDepartment onClose={close} />
      </DefaultModal>
    </div>
  );
};

export default Department;
