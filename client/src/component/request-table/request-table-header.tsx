import { Checkbox } from "@mantine/core";
import { BsTrash } from "react-icons/bs";

const RequestTableHeader = ({
  viewType,
  allSelected,
  onSelectAll,
  handleDelete,
}: {
  viewType: string;
  allSelected: boolean;
  onSelectAll: () => void;
  handleDelete: () => void;
}) => {
  return (
    <div className="flex items-center">
      <div className="w-[10%] flex justify-start ml-4">
        <Checkbox color="black" checked={allSelected} onChange={onSelectAll} />
      </div>
      {viewType === "time-off" ? (
        <>
          <div className="w-[15%] text-center">Date From</div>
          <div className="w-[15%] text-center">Date To</div>
          <div className="w-[15%] text-center">Leave Type</div>
          <div className="w-[20%] text-center">Reason</div>
        </>
      ) : viewType === "time-sheet" ? (
        <>
          <div className="w-[15%] text-center">From</div>
          <div className="w-[15%] text-center">To</div>
          <div className="w-[10%] text-center">Hours</div>
          <div className="w-[15%] text-center">Client</div>
          <div className="w-[12%] text-center">Project</div>
          <div className="w-[17%] text-center">Task</div>
          <div className="w-[15%] text-center">Description</div>
        </>
      ) : viewType === "hr" || viewType === "profile-edit" ? (
        <>
          <div className="w-[15%] text-center">Date</div>
          <div className="w-[20%] text-center">Request For</div>
          <div className="w-[15%] text-center">Priority</div>
          <div className="w-[15%] text-center">Description</div>
        </>
      ) : (
        <>
          <div className="w-[15%] text-center">Date</div>
          <div className="w-[20%] text-center">Access For</div>
          <div className="w-[15%] text-center">Priority</div>
          <div className="w-[15%] text-center">Description</div>
        </>
      )}
      <div className="w-[15%] text-center">Status</div>
      <div
        className="w-[10%] flex justify-center cursor-pointer"
        onClick={handleDelete}
      >
        <BsTrash color="red" />
      </div>
    </div>
  );
};

export default RequestTableHeader;
