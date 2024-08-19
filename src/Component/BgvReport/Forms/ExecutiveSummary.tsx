import ReusableTable from "../BgvTable";

const tableData = [
  { fact: 1, details: "Education verification", remarks: "Verified" },
  { fact: 2, details: "Employment verification", remarks: "Verified" },
  { fact: 3, details: "Criminal records verification", remarks: "Verified" },
  { fact: 4, details: "Identity verification", remarks: "Verified" },
  { fact: 5, details: "Drug test", remarks: "Verified" },
  { fact: 6, details: "Global database check", remarks: "Verified" },
  { fact: 7, details: "Address check", remarks: "Verified" },
];

const headers = ["S.No", "Service Requested", "Verification Remarks"];
const keys = ["fact", "details", "remarks"];

const ExecutiveSummary = () => {
  console.log(100 / headers.length);

  return <ReusableTable data={tableData} headers={headers} keys={keys} />;
};

export default ExecutiveSummary;
