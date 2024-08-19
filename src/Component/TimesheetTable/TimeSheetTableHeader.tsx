import { Checkbox } from "@mantine/core";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const TimeSheetTableHeader = ({ type = "day" }: { type?: string }) => {
  const [sortConfig, setSortConfig] = useState(false);

  const handleSort = () => {
    setSortConfig(!sortConfig);
  };

  const renderSortIcon = () => {
    return sortConfig ? (
      <TiArrowSortedUp className="text-[#030229]" />
    ) : (
      <TiArrowSortedDown className="text-[#030229]" />
    );
  };

  return (
    <div className="flex items-center text-[#030229] text-xs pb-2">
      <div className="w-[5%] flex justify-start ml-4">
        <Checkbox color="black" />
      </div>

      <div
        className="w-[10%] text-center cursor-pointer flex items-center justify-center gap-1"
        onClick={handleSort}
      >
        Project {renderSortIcon()}
      </div>

      {type === "day" ? (
        <div
          className="w-[30%] text-center cursor-pointer flex items-center justify-center gap-1"
          onClick={handleSort}
        >
          Date {renderSortIcon()}
        </div>
      ) : (
        <>
          <div
            className="w-[15%] text-center cursor-pointer flex items-center justify-center gap-1"
            onClick={handleSort}
          >
            From {renderSortIcon()}
          </div>
          <div
            className="w-[15%] text-center cursor-pointer flex items-center justify-center gap-1"
            onClick={handleSort}
          >
            To {renderSortIcon()}
          </div>
        </>
      )}

      <div
        className="w-[10%] text-center cursor-pointer flex items-center justify-center gap-1"
        onClick={handleSort}
      >
        Task {renderSortIcon()}
      </div>

      <div
        className="w-[10%] text-center cursor-pointer flex items-center justify-center gap-1"
        onClick={handleSort}
      >
        Attachment {renderSortIcon()}
      </div>

      <div
        className="w-[10%] text-center cursor-pointer flex items-center justify-center gap-1"
        onClick={handleSort}
      >
        Work Hours {renderSortIcon()}
      </div>

      <div
        className="w-[7.5%] text-center cursor-pointer flex items-center justify-center gap-1"
        onClick={handleSort}
      >
        Status {renderSortIcon()}
      </div>
      <div
        className="w-[7.5%] text-center cursor-pointer flex items-center justify-center gap-1"
        onClick={handleSort}
      >
        Approved By {renderSortIcon()}
      </div>
      <div className="w-[10%] flex justify-center">
        <BsTrash color="red" />
      </div>
    </div>
  );
};

export default TimeSheetTableHeader;
