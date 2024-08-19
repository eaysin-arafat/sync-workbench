import VerifiedIcon from "@/Assets/bgv-report/VerifiedIcon";

type DataType = {
  [key: string]: any;
};

interface ReusableTableProps {
  data: DataType[];
  headers: string[];
  keys: string[];
}

const BgvReportTable = ({ data, headers, keys }: ReusableTableProps) => {
  if (data.length === 0) return null;

  return (
    <div className="border rounded-lg pt-4">
      <div className="flex items-center border-b pb-3">
        {headers.map((header, index) => (
          <div
            key={index}
            className={`text-center text-sm font-extrabold`}
            style={{ width: `${100 / headers.length}%` }}
          >
            {header}
          </div>
        ))}
      </div>

      {data.map((row, rowIndex) => (
        <div
          className={`flex items-center bg-white py-3 rounded-md border-b ${
            rowIndex === data.length - 1 && "border-none"
          }`}
          key={rowIndex}
        >
          {keys.map((key, colIndex) => (
            <div
              key={colIndex}
              className={`text-center text-xs flex items-center justify-center gap-2`}
              style={{ width: `${100 / keys.length}%` }}
            >
              {row[key]}
              {colIndex === keys.length - 1 && <VerifiedIcon />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BgvReportTable;
