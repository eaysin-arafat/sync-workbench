import React from "react";
import { TbArrowsSort } from "react-icons/tb";

// Define types for the column and data props
interface Column {
  header: string;
  accessor: string;
  sortable?: boolean;
  render?: (item: any) => React.ReactNode;
  width?: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  actions?: (item: any) => React.ReactNode;
}

const TableComponent: React.FC<TableProps> = ({ columns, data, actions }) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          {columns.map((column, index) => (
            <th
              key={index}
              className="py-3 px-4 font-medium text-black dark:text-white cursor-pointer"
              style={{
                minWidth: column?.width ? `${column?.width}px` : "200px",
              }}
            >
              <span className="flex items-center gap-2">
                {column.header}
                {column.sortable && <TbArrowsSort />}
              </span>
            </th>
          ))}
          {actions && (
            <th className="py-3 px-4 font-medium text-black dark:text-white">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item, key) => (
          <tr
            key={key}
            className={`${
              data.length === key + 1
                ? "!border-none"
                : "border-b border-[#eee]"
            }`}
          >
            {columns.map((column, colIndex) => (
              <td key={colIndex} className={`py-3 px-4`}>
                {column.render ? column.render(item) : item[column.accessor]}
              </td>
            ))}
            {actions && <td className="py-5 px-4">{actions(item)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
