import { Select } from "@mantine/core";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";

import CalenderType1 from "@/assets/Icons/CalenderType1";
import TimeOff from "@/assets/Icons/TimeOff";
import TimeSheet from "@/assets/Icons/TimeSheet";
import CompanyCard from "@/component/dashboard/company-card";
import MainCard from "@/component/ui/card";

const timeSheetListDropdown = ["Day", "Week", "Month"];
const requestListDropdown = [
  "HR",
  "TimeOff",
  "TimeSheet",
  "Access",
  "ProfileChange",
];

const UserDashboard = () => {
  const [selectedRequestType, setSelectedRequestType] = useState("HR");
  const [selectedTimesheetType, setSelectedTimesheetType] = useState("Day");

  const timeoff = [
    {
      id: "total",
      quantity: 100,
      title: "Total",
    },
    {
      id: "used",
      quantity: 50,
      title: "Used",
    },
    {
      id: "available",
      quantity: 70,
      title: "Available",
    },
  ];

  const timesheet = [
    {
      id: "total",
      quantity: 80,
      title: "Total",
    },
    {
      id: "pending",
      quantity: 20,
      title: "Pending",
    },
    {
      id: "approved",
      quantity: 200,
      title: "Approved",
    },
    {
      id: "denied",
      quantity: 1000,
      title: "Denied",
    },
  ];

  const requests = [
    {
      id: "total",
      quantity: 200,
      title: "Total",
    },
    {
      id: "pending",
      quantity: 300,
      title: "Pending",
    },
    {
      id: "approved",
      quantity: 400,
      title: "Approved",
    },
    {
      id: "denied",
      quantity: 300,
      title: "Denied",
    },
  ];

  return (
    <div className="flex flex-col py-8 mt-8">
      <div className="grid md:grid-cols-10 gap-6 mb-[40px]">
        <MainCard className="col-span-3 md:col-span-5 lg:col-span-3 px-10">
          <h3 className="text-base mb-5 flex items-center gap-1.5 justify-center">
            TimeOff <TimeOff />
          </h3>
          <div className="flex items-center justify-between py-2">
            {timeoff.map((item) => (
              <CompanyCard {...item} />
            ))}
          </div>
        </MainCard>

        <MainCard className="col-span-3 md:col-span-5 lg:col-span-3 px-7">
          <h3 className="text-base flex items-center gap-1.5 justify-center mb-5">
            TimeSheets <TimeSheet />
          </h3>
          <div className="flex items-center justify-between py-2">
            {timesheet.map((item) => (
              <CompanyCard {...item} />
            ))}
          </div>
        </MainCard>

        <MainCard className="col-span-3 md:col-span-4 px-10">
          <h3 className="text-base flex items-center gap-1.5 mb-5 justify-center">
            Requests <BsFillSendFill color="#FF0000" />
          </h3>
          <div className="flex items-center justify-between py-2">
            {requests.map((item) => (
              <CompanyCard {...item} />
            ))}
          </div>
        </MainCard>

        <MainCard className="col-span-3 md:col-span-3">
          <div>
            <h3 className="text-[15px] mb-5 flex items-center justify-center gap-1.5">
              Missed Timesheet <IoWarningOutline color="red" />
            </h3>
          </div>
          <div className="flex justify-evenly">
            <div className={`flex flex-col items-center justify-center gap-5`}>
              <h2 className={`text-xl text-red-500`}>{200}</h2>

              <h4 className="text-base">Timeshets</h4>
            </div>
            <div className={`flex flex-col items-center justify-center gap-5`}>
              <h2 className={`text-xl text-red-500`}>{0}</h2>

              <h4 className="text-sm">Hours</h4>
            </div>
          </div>
        </MainCard>

        <MainCard className="col-span-3 md:col-span-3">
          <div>
            <h3 className="text-[15px] mb-5 flex items-center justify-center gap-1.5">
              Last Pay Day <CalenderType1 color="red" />
            </h3>
          </div>
          <CompanyCard quantity={"15 July"} className="!pt-6" />
        </MainCard>
      </div>

      <div className="bg-white p-5 rounded-[15px]">
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Recent Timesheets</h2>
          <div className="w-[160px]">
            <Select
              data={timeSheetListDropdown}
              value={selectedTimesheetType}
              onChange={(value) => setSelectedTimesheetType(value || "Day")}
            />
          </div>
        </div>
        {/* <div className="mt-5 relative">
          {typeof Array.from({ length: 10 })?.map === "function" &&
          selectedTimesheetType === "Day"
            ? Array.from({ length: 10 })?.map((item: any) => (
                <div className="mb-5" key={Date.now()}>
                  <SingleTimesheetDay data={{}} reFetch={() => {}} />
                </div>
              ))
            : Object.keys(Array.from({ length: 10 }) || {}).map((key) => {
                return Array.from({ length: 10 }).map((item: any) => (
                  <div className="mb-5" key={Date.now()}>
                    <SingleListTimeSheet
                      type={selectedTimesheetType}
                      key={Date.now()}
                      data={{}}
                      keyData={key}
                      reFetch={() => {}}
                    />
                  </div>
                ));
              })}
        </div> */}
      </div>
      {/* <div className="bg-white p-5 rounded-[15px] mt-5">
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Recent Requests</h2>
          <div className="w-[160px]">
            <Select
              data={requestListDropdown}
              value={selectedRequestType}
              onChange={(value) => setSelectedRequestType(value || "HR")}
            />
          </div>
        </div>

        <div className="mt-5 relative">
          {Array.from({ length: 10 })?.map((request: any) => {
            return (
              <div className="mb-5">
                <SingleRequestList
                  data={request}
                  reFetch={() => {}}
                  type={selectedRequestType}
                  isLoading={false}
                />
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default UserDashboard;
