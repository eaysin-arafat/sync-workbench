import PlusIcon from "@/assets/second-dashboard/PlusIcon";

import { Button, FileInput, Select } from "@mantine/core";
import { useState } from "react";
import FormInput from "../ui/form-elements/input";

const initialState = {
  client: "",
  project: "",
  activity: "",
  hours: Array(7).fill(""),
  status: "Pending",
};

const NewTimeSheetTemplateTwo = () => {
  const tableHeader = [
    { id: "client", title: "Client", width: "10%" },
    { id: "project", title: "Project", width: "10%" },
    { id: "activity", title: "Activity", width: "10%" },
    { id: "12,Mon", title: "12, Mon", width: "7%" },
    { id: "13,Tue", title: "13,Tue", width: "7%" },
    { id: "14,Wed", title: "14,Wed", width: "7%" },
    { id: "15,Thur", title: "15,Thur", width: "7%" },
    { id: "16,Fri", title: "16,Fri", width: "7%" },
    { id: "17,Sat", title: "17,Sat", width: "7%" },
    { id: "18,Sun", title: "18,Sun", width: "7%" },
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
                data={["Client 1", "Client 2", "Client 3"]}
                styles={{ input: { backgroundColor: "transparent" } }}
              />
            </div>

            <div className="w-[10%]">
              <Select
                placeholder="Select Project"
                data={["Project 1", "Project 2", "Project 3", "Project 4"]}
                styles={{ input: { backgroundColor: "transparent" } }}
              />
            </div>

            <div className="w-[10%]">
              <Select
                placeholder="Select Activity"
                data={["Activity 1", "Activity 2", "Activity 3", "Activity 4"]}
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
                data={["Pending", "Approved", "Denied"]}
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

export default NewTimeSheetTemplateTwo;
