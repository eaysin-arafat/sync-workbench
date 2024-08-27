import Table from "@/component/ui/table";
import { EmployeeType } from "@/constants/api-interface/employee";
import { EntityAttributes } from "@/constants/api-interface/root";
import TableActionBtn from "./table-action-button";

const columns = [
  {
    header: "Employee ID",
    accessor: "id",
    sortable: true,
  },
  {
    header: "Full Name",
    accessor: "name",
    sortable: true,
    render: (item: any) => {
      return (
        <>
          <h5 className="font-medium text-black">
            {item.name?.first_name} {item.name?.last_name}
          </h5>
        </>
      );
    },
  },
  {
    header: "Username",
    accessor: "username",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Date of Hire",
    accessor: "date_of_hire",
  },
  {
    header: "Salary",
    accessor: "salary",
  },
  {
    header: "Role",
    accessor: "role",
  },
  {
    header: "Employment Status",
    accessor: "employment_status",
  },
  {
    header: "Employee Status",
    accessor: "employee_status",
    render: (item: any) => {
      console.log("status", item?.employee_status);

      return (
        <p
          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
            item.employee_status === "Active"
              ? "bg-success text-success"
              : item.employee_status === "Inactive"
              ? "bg-danger text-danger"
              : "bg-warning text-warning"
          }`}
        >
          {item.employee_status}
        </p>
      );
    },
  },
  {
    header: "Is Internship",
    accessor: "is_internship",
    render: (item: any) => {
      return <p>{item?.is_internship ? "True" : "False"}</p>;
    },
  },
  {
    header: "Position Title",
    accessor: "position_title",
  },
  {
    header: "Department",
    accessor: "department",
  },
  {
    header: "Manager",
    accessor: "manager",
  },
];

const EmployeeTable = ({
  employees,
}: {
  employees: EntityAttributes<EmployeeType>[];
}) => {
  const tableData = employees?.map((employee) => {
    const { first_name, last_name, username, email, position_title } =
      employee?.attributes?.user_info?.data?.attributes;
    const {
      date_of_hire,
      salary,
      employment_status,
      employee_status,
      is_internship,
      manager_id,
    } = employee?.attributes;

    return {
      id: employee?.id,
      name: {
        first_name,
        last_name,
      },
      username,
      email,
      date_of_hire,
      salary,
      role: "",
      employment_status,
      employee_status,
      is_internship,
      position_title,
      department: "",
      manager: "",
    };
  });

  console.log(tableData);

  return (
    <div className="rounded-sm bg-white px-5 pt-6 shadow-1 dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto">
        <Table
          columns={columns}
          data={tableData}
          actions={(item) => <TableActionBtn data={item} />}
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
