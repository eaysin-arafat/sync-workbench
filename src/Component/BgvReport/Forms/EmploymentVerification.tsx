import ImageIcon from "@/Assets/bgv-report/ImageIcon";
import ReusableTable from "../BgvTable";

const tableData = [
  { fact: 1, details: "Education verification", remarks: "Verified" },
  { fact: 2, details: "Employment verification", remarks: "Verified" },
  { fact: 3, details: "Criminal records verification", remarks: "Verified" },
  { fact: 4, details: "Identity verification", remarks: "Verified" },
  { fact: 5, details: "Drug test", remarks: "Verified" },
  { fact: 6, details: "Global database check", remarks: "Verified" },
  { fact: 7, details: "Addre ss check", remarks: "Verified" },
];

const headers = ["Facts", "Details Provided by client", "Verification Remarks"];
const keys = ["fact", "details", "remarks"];

const EmploymentVerification = () => {
  const hasImage = false;

  return (
    <>
      <ReusableTable data={tableData} headers={headers} keys={keys} />

      <div className="flex items-center justify-center my-11 mt-14">
        {hasImage ? (
          <img src="" alt="" />
        ) : (
          <div className="w-[357px] h-[250px] flex items-center justify-center border border-black">
            <ImageIcon />
          </div>
        )}
      </div>
    </>
  );
};

export default EmploymentVerification;
