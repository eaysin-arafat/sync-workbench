import { fetchGetDashboardData } from "@/redux/reducers/extra-slicer";
import { fetchGetTimeSheetsCount } from "@/redux/reducers/time-sheets-slicer";
import { AppDispatch, RootState } from "@/redux/store";
import { LoadingOverlay, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import CalenderType1 from "@/assets/Icons/CalenderType1";
import TimeOff from "@/assets/Icons/TimeOff";
import TimeSheet from "@/assets/Icons/TimeSheet";
import CompanyCard from "@/component/dashboard/company-card";
import MainCard from "@/component/ui/card";
import SingleListTimeSheet from "./SingleListTimeSheet";
import SingleRequestList from "./SingleRequestList";
import SingleTimesheetDay from "./SingleTimesheetDay";

const timeSheetListDropdown = ["Day", "Week", "Month"];
const requestListDropdown = [
  "HR",
  "TimeOff",
  "TimeSheet",
  "Access",
  "ProfileChange",
];

const currentYear = new Date().getFullYear();
const UserDashboard = () => {
  const [selectedRequestType, setSelectedRequestType] = useState("HR");
  const [selectedTimesheetType, setSelectedTimesheetType] = useState("Day");
  const dispatch: AppDispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.userReducer);
  const { dashboardData, isLoading } = useSelector(
    (state: RootState) => state.extraReducer
  );
  const host = window.location.host;
  const subdomain = host.split(".")[0];
  const portalUrl = `${subdomain}.saciahub.com`;

  const timeoff = [
    {
      id: "total",
      quantity:
        dashboardData?.TimeOff?.Used_timeoff_count +
        dashboardData?.TimeOff?.Available_timeoff_count,
      title: "Total",
    },
    {
      id: "used",
      quantity: dashboardData?.TimeOff?.Used_timeoff_count,
      title: "Used",
    },
    {
      id: "available",
      quantity: dashboardData?.TimeOff?.Available_timeoff_count,
      title: "Available",
    },
  ];

  const timesheet = [
    {
      id: "total",
      quantity:
        dashboardData?.current_month_timesheet?.current_month_timesheet_count,
      title: "Total",
    },
    {
      id: "pending",
      quantity:
        dashboardData?.current_month_timesheet
          ?.current_month_pending_timesheet_count,
      title: "Pending",
    },
    {
      id: "approved",
      quantity:
        dashboardData?.current_month_timesheet
          ?.current_month_approved_timesheet_count,
      title: "Approved",
    },
    {
      id: "denied",
      quantity:
        dashboardData?.current_month_timesheet
          ?.current_month_denied_timesheet_count,
      title: "Denied",
    },
  ];

  const requests = [
    {
      id: "total",
      quantity: dashboardData?.Request?.total_count,
      title: "Total",
    },
    {
      id: "pending",
      quantity: dashboardData?.Request?.pending_count,
      title: "Pending",
    },
    {
      id: "approved",
      quantity: dashboardData?.Request?.approved_count,
      title: "Approved",
    },
    {
      id: "denied",
      quantity: dashboardData?.Request?.denied_count,
      title: "Denied",
    },
  ];

  const currentMonthNumber = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const day = `${currentYear}-${currentMonthNumber}`;

  useEffect(() => {
    console.log("selectedTimesheetType", selectedRequestType);
    dispatch(
      fetchGetDashboardData({
        viewType: selectedTimesheetType ? selectedTimesheetType : "Day",
        day: day,
        type: selectedRequestType ? selectedRequestType : "HR",
        portalUrl,
        token: token as any,
      })
    );
    dispatch(
      fetchGetTimeSheetsCount({
        year: currentYear,
        portalUrl,
        token: token as any,
      }) as any
    );
  }, [selectedRequestType, selectedTimesheetType]);

  const reFetch = () => {
    dispatch(
      fetchGetDashboardData({
        viewType: selectedTimesheetType,
        day: day,
        type: selectedRequestType,
        portalUrl,
        token: token as any,
      })
    );
    dispatch(
      fetchGetTimeSheetsCount({
        year: currentYear,
        portalUrl,
        token: token as any,
      }) as any
    );
  };

  if (isLoading) {
    return <LoadingOverlay visible={true} />;
  } else {
    return (
      <div className="flex flex-col py-8 mt-8">
        <div className="grid grid-cols-10 gap-6 mb-[40px]">
          <MainCard className="col-span-2">
            <h3 className="text-base mb-5 flex items-center gap-1.5 justify-center">
              TimeOff <TimeOff />
            </h3>
            <div className="flex items-center justify-between py-2">
              {timeoff.map((item) => (
                <CompanyCard {...item} />
              ))}
            </div>
          </MainCard>

          <MainCard className="col-span-3">
            <h3 className="text-base flex items-center gap-1.5 justify-center mb-5">
              TimeSheets <TimeSheet />
            </h3>
            <div className="flex items-center justify-between py-2">
              {timesheet.map((item) => (
                <CompanyCard {...item} />
              ))}
            </div>
          </MainCard>
          <MainCard className="col-span-3">
            <h3 className="text-base flex items-center gap-1.5 mb-5 justify-center">
              Requests <BsFillSendFill color="#FF0000" />
            </h3>
            <div className="flex items-center justify-between py-2">
              {requests.map((item) => (
                <CompanyCard {...item} />
              ))}
            </div>
          </MainCard>
          <MainCard className="col-span-2">
            <div>
              <h3 className="text-[15px] mb-5 flex items-center justify-center gap-1.5">
                Missed Timesheet <IoWarningOutline color="red" />
              </h3>
            </div>
            <div className="flex justify-evenly">
              <div
                className={`flex flex-col items-center justify-center gap-5`}
              >
                <h2 className={`text-3xl font-semibold text-red-500`}>
                  {dashboardData?.MissedTimesheet?.total_timesheet_hours ?? 0}
                </h2>

                <h4 className="text-base">Timeshets</h4>
              </div>
              <div
                className={`flex flex-col items-center justify-center gap-5`}
              >
                <h2 className={`text-3xl font-semibold text-red-500`}>
                  {dashboardData?.MissedTimesheet?.timesheet_count ?? 0}
                </h2>

                <h4 className="text-base">Hours</h4>
              </div>
            </div>
          </MainCard>

          <MainCard className="col-span-2">
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
          <div className="mt-5 relative">
            {typeof dashboardData?.last_3_timesheets?.map === "function" &&
            selectedTimesheetType === "Day"
              ? dashboardData?.last_3_timesheets?.map((timeSheet: any) => (
                  <div className="mb-5" key={timeSheet.ID}>
                    <SingleTimesheetDay data={timeSheet} reFetch={reFetch} />
                  </div>
                ))
              : Object.keys(dashboardData?.last_3_timesheets || {}).map(
                  (key) => {
                    const timeSheets = dashboardData?.last_3_timesheets[key];
                    if (Array.isArray(timeSheets)) {
                      return timeSheets.map((timeSheet: any) => (
                        <div className="mb-5" key={timeSheet.ID}>
                          <SingleListTimeSheet
                            type={selectedTimesheetType}
                            key={timeSheet.ID}
                            data={timeSheet}
                            keyData={key}
                            reFetch={reFetch}
                          />
                        </div>
                      ));
                    }
                    return null;
                  }
                )}
          </div>
        </div>
        <div className="bg-white p-5 rounded-[15px] mt-5">
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
            {dashboardData?.last_3_requests?.map((request: any) => {
              return (
                <div className="mb-5">
                  <SingleRequestList
                    data={request}
                    reFetch={reFetch}
                    type={selectedRequestType}
                    isLoading={isLoading}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default UserDashboard;
