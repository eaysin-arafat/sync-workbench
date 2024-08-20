import FilterIcon from "@/assets/filter/FilterIcon";
import ResetIcon from "@/assets/filter/ResetIcon";
import { useState } from "react";
import CompletedButton from "./buttons/completed-button";
import FailedButton from "./buttons/failed-button";
import FilterSelect from "./buttons/filter-select";
import PendingButton from "./buttons/pending-button";

type ButtonType = "completed" | "pending" | "failed";

const Filter = () => {
  const [activeButton, setActiveButton] = useState<ButtonType | null>(null);

  const handleButtonClick = (
    buttonType: "completed" | "pending" | "failed"
  ) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="border grid grid-flow-col place-items-center gap-5 px-3">
        <button className="pr-2.5 border-r h-full">
          <FilterIcon />
        </button>

        <button className="whitespace-nowrap text-sm font-bold h-full pr-2.5 border-r">
          Filter By
        </button>

        <div className="border-r h-full flex items-center justify-center">
          <FilterSelect placeholder="Name" data={["A-Z", "Z-A"]} />
        </div>

        <div className="border-r h-full flex items-center justify-center">
          <FilterSelect placeholder="Email" data={["A-Z", "Z-A"]} />
        </div>

        <div className="border-r h-full flex items-center justify-center">
          <FilterSelect placeholder="Status" data={["A-Z", "Z-A"]} />
        </div>

        <button className="flex items-center gap-2 font-semibold text-red-600 whitespace-nowrap py-3 pr-2.5">
          <ResetIcon /> Reset Filter
        </button>
      </div>

      <div className="flex border rounded-md">
        <CompletedButton
          onClick={() => handleButtonClick("completed")}
          isActive={activeButton === "completed"}
        />

        <PendingButton
          onClick={() => handleButtonClick("pending")}
          isActive={activeButton === "pending"}
        />

        <FailedButton
          onClick={() => handleButtonClick("failed")}
          isActive={activeButton === "failed"}
        />
      </div>
    </div>
  );
};

export default Filter;
