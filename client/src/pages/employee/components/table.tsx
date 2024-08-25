import TableActionBtn from "./table-action-button";
import TableComponent from "./table-component";

export type Package = {
  name: string;
  price: number;
  invoiceDate: string;
  status: string;
};

const columns = [
  {
    header: "Name",
    accessor: "name",
    sortable: true,
    width: "220",
    render: (item: any) => (
      <>
        <h5 className="font-medium text-black">
          {item.name} ${item.price}
        </h5>
      </>
    ),
  },
  {
    header: "Employee ID",
    accessor: "employeeId",
    sortable: true,
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Mobile",
    accessor: "mobile",
  },
  {
    header: "Join Date",
    accessor: "invoiceDate",
  },
  {
    header: "Role",
    accessor: "role",
  },
  {
    header: "Status",
    accessor: "status",
    render: (item: any) => (
      <p
        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
          item.status === "Paid"
            ? "bg-success text-success"
            : item.status === "Unpaid"
            ? "bg-danger text-danger"
            : "bg-warning text-warning"
        }`}
      >
        {item.status}
      </p>
    ),
  },
];

const packageData: Package[] = [
  {
    name: "Free package",
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Business Package",
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: "Unpaid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Pending",
  },
];

const Table = () => {
  return (
    <div className="rounded-sm bg-white px-5 pt-6 shadow-1 dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto">
        <TableComponent
          columns={columns}
          data={packageData}
          actions={(item) => <TableActionBtn data={item} />}
        />
      </div>
    </div>
  );
};

export default Table;
