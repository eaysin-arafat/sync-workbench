import DownloadIcon from "@/Assets/second-dashboard/DownloadIcon";
import PlusIcon from "@/Assets/second-dashboard/PlusIcon";
import FileInput from "@/Component/UI/FormElements/FileInput";
import FormInput from "@/Component/UI/FormElements/FormInput";
import { Button, Select } from "@mantine/core";
import { useState } from "react";

const initialState = {
  client: "",
  project: "",
  activity: "",
  hours: Array(7).fill(""),
  status: "Pending",
};

const SecondDashboard = () => {
  const tableHeader = [
    { id: "client", title: "Client", width: "10%" },
    { id: "project", title: "Project", width: "10%" },
    { id: "activity", title: "Activity", width: "10%" },
    { id: "29,Mon", title: "29, Mon", width: "7%" },
    { id: "30,Tue", title: "30,Tue", width: "7%" },
    { id: "31,Wed", title: "31,Wed", width: "7%" },
    { id: "01,Thur", title: "01,Thur", width: "7%" },
    { id: "02,Fri", title: "02,Fri", width: "7%" },
    { id: "03,Sat", title: "03,Sat", width: "7%" },
    { id: "04,Sun", title: "04,Sun", width: "7%" },
    { id: "status", title: "Total", width: "10%" },
    { id: "action", title: "Status", width: "10%" },
  ];

  const [rows, setRows] = useState([initialState]);

  const handleAddRow = () => {
    setRows([...rows, { ...initialState }]);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-end gap-3 py-8">
        <FileInput
          label="Attachment"
          required
          className="flex items-center gap-2"
          startIcon={<DownloadIcon />}
          height="44px"
        />

        <Button
          className=" !bg-black text-white !font-bold !text-sm"
          style={{ height: "44px", width: "104.11px" }}
        >
          Submit
        </Button>
      </div>
      <div>
        <div className="flex items-center justify-center gap-2 border-t border-b text-[#030229] text-xs py-3 bg-white">
          {tableHeader.map((item) => (
            <div
              key={item.id}
              className="text-center text-base"
              style={{ width: item.width }}
            >
              {item.title}
            </div>
          ))}
        </div>

        {rows.map((row, index) => (
          <div
            className="flex items-center gap-2 py-4 rounded-md border-b"
            key={index}
          >
            <div className="w-[10%]">
              <Select
                placeholder="Select Client"
                data={["React", "Angular", "Vue", "Svelte"]}
                styles={{ input: { backgroundColor: "transparent" } }}
              />
            </div>

            <div className="w-[10%]">
              <Select
                placeholder="Select Project"
                data={["React", "Angular", "Vue", "Svelte"]}
                styles={{ input: { backgroundColor: "transparent" } }}
              />
            </div>

            <div className="w-[10%]">
              <Select
                placeholder="Select Activity"
                data={["React", "Angular", "Vue", "Svelte"]}
                styles={{ input: { backgroundColor: "transparent" } }}
              />
            </div>

            {row.hours.map((hour, hourIndex) => (
              <div
                key={hourIndex}
                className="w-[7%] text-center text-xs font-semibold rounded-md"
              >
                <FormInput
                  placeholder="Hrs"
                  height="auto"
                  backgroundColor="transparent"
                />
              </div>
            ))}

            <div className="w-[10%] text-center text-xs font-semibold border py-2.5 rounded-md">
              Total Hrs
            </div>
            <div className="w-[10%]">
              <Select
                placeholder="Pending"
                data={["Pending", "Processing", "Solved"]}
                styles={{ input: { backgroundColor: "transparent" } }}
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="transparent"
        color="#0047FF"
        style={{ border: "1px dashed black" }}
        leftSection={<PlusIcon />}
        className="my-3 mt-5 !h-[31.3px]"
        size="sm"
        onClick={handleAddRow}
      >
        Add New
      </Button>

      <div className="flex items-center justify-center gap-2 bg-black text-white text-xs h-[35px] mt-4">
        <div className="text-center text-sm w-[30%]"></div>
        <div className="text-center text-sm w-[7%]">8</div>
        <div className="text-center text-sm w-[7%]">0</div>
        <div className="text-center text-sm w-[7%]">0</div>
        <div className="text-center text-sm w-[7%]">0</div>
        <div className="text-center text-sm w-[7%]">0</div>
        <div className="text-center text-sm w-[7%]">0</div>
        <div className="text-center text-sm w-[7%]">0</div>

        <div className="text-center text-sm w-[10%]">8</div>
        <div className="text-center text-sm w-[10%]"></div>
      </div>
    </div>
  );
};

export default SecondDashboard;
