import Table from "@/component/ui/table";
import { DepartmentType } from "@/constants/api-interface/department";
import { EntityAttributes } from "@/constants/api-interface/root";
import TableActionBtn from "./table-action-button";

const columns = [
  {
    header: "Name",
    accessor: "department_name",
    sortable: true,
  },
  {
    header: "Description",
    accessor: "description",
    sortable: true,
  },
  {
    header: "Location",
    accessor: "location",
    sortable: true,
  },
  {
    header: "Manager",
    accessor: "manager_name",
    sortable: true,
  },
  {
    header: "Employees",
    accessor: "employees",
    sortable: true,
  },
];

const DepartmentTable = ({
  departments,
}: {
  departments: EntityAttributes<DepartmentType>[];
}) => {
  const departmentTableData = departments?.map((department) => {
    const {
      department_name,
      description,
      location,
      employees,
      manager_id,
      projects,
    } = department?.attributes;

    console.log("data", manager_id);

    return {
      department_name,
      description,
      location,
      manager_name:
        manager_id?.data?.attributes?.user_info?.data?.attributes?.username,
      employees: employees?.data?.map(
        (item) => item?.attributes?.user_info?.data?.attributes?.username
      ),
    };
  });

  console.log(departments);

  return (
    <div className="rounded-sm bg-white px-5 pt-6 shadow-1 dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto">
        <Table
          columns={columns}
          data={departmentTableData}
          actions={(item) => <TableActionBtn data={item} />}
        />
      </div>
    </div>
  );
};

export default DepartmentTable;
