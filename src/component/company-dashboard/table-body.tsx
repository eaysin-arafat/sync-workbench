import { Button } from "@mantine/core";
import { MdAccountCircle } from "react-icons/md";

const TableBody = () => {
  const status = "pending";

  return (
    <div className="flex items-center py-3 bg-white mt-2 rounded-md border-b">
      <div className="w-[20%] text-center text-sm font-bold flex items-center justify-center gap-2.5">
        <MdAccountCircle size={30} /> UserName
      </div>

      <div className="w-[20%] text-center text-sm font-bold">
        Example@example.com
      </div>

      <div className="w-[20%] text-center text-sm font-bold">20 Jul, 2024</div>
      <div className="w-[20%] text-center text-sm font-bold">
        <Button bg={status === "pending" ? "#FCBE2D" : "#00B69B"}>
          {status === "pending" ? "Pending" : "Completed"}
        </Button>
      </div>
      <div className="w-[20%] text-center text-sm font-bold">
        <Button
          variant="outline"
          className="!border-black !text-black !font-bold"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default TableBody;
