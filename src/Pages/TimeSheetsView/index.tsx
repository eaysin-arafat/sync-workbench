import SingleListDay from "@/Component/TimesheetTable/SingleListDay";
import SingleListMonth from "@/Component/TimesheetTable/SingleListMonth";
import SingleListWeek from "@/Component/TimesheetTable/SingleListWeek";
import TimeSheetTableHeader from "@/Component/TimesheetTable/TimeSheetTableHeader";
import {
  fetchGetTimeSheetsDay,
  fetchGetTimeSheetsMonth,
  fetchGetTimeSheetsWeek,
} from "@/redux/reducers/timeSheetsSlicer";
import { AppDispatch, RootState } from "@/redux/store";
import { URLTimeSheetsTemplateTwo } from "@/Routes/router-link";
import { getMonthNumber } from "@/utils/get-month-number";
import { Button, LoadingOverlay, Modal, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewTimeSheetModal from "../../Component/TimeSheets/NewTimeSheetModal";
import classes from "./timesheetview.module.css";

export interface TimeSheetDataDay {
  ID: number;
  UserUUID: string;
  ClientName: string;
  ProjectName: string;
  SOWName: string;
  User_Manager: string;
  ProjectBucket: string;
  Month: number;
  Date: string;
  StartDate: string;
  EndDate: string;
  HoursWorked: number;
  Status: string;
  TimesheetAttachmentURL: string;
}

export interface TimeSheetDataWeek {
  ID: string[];
  client_name: string;
  project_name: string;
  task: string;
  total_hours: number;
  attachment: string[];
  status: string;
}

export interface TimeSheetDataMonth {
  ID: string[];
  client_name: string;
  project_name: string;
  task: string;
  total_hours: number;
  attachment: string[];
  status: string;
}

export interface TimeSheetsDataWeekResponse {
  [key: string]: TimeSheetDataWeek[];
}

export interface TimeSheetsDataMonthResponse {
  [key: string]: TimeSheetDataMonth[];
}

const current = new Date().getFullYear();
const curremtMonthNumber = new Date().getMonth() + 1;
const currentYearMonth = current + "-" + curremtMonthNumber;

const TimeSheetsView = () => {
  const dispatch: AppDispatch = useDispatch();
  const { token, signInData } = useSelector(
    (state: RootState) => state.userReducer
  );
  const [viewType, setViewType] = useState("day");
  const {
    isLoading,
    timeSheetsDataDay,
    timeSheetsDataWeek,
    timeSheetsDataMonth,
    selectedTimeSheet,
  } = useSelector((state: RootState) => state.timeSheetReducer) as {
    isLoading: boolean;
    timeSheetsDataDay: TimeSheetDataDay[] | null;
    selectedTimeSheet: string | null;
    timeSheetsDataWeek: TimeSheetsDataWeekResponse | null;
    timeSheetsDataMonth: TimeSheetsDataMonthResponse | null;
  };

  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });

  const host = window.location.host;
  const subdomain = host.split(".")[0];
  const portalUrl = `${subdomain}.saciahub.com`;
  const monthNumber = selectedTimeSheet
    ? getMonthNumber(selectedTimeSheet.split(" ")[0])
    : 0;
  const year = selectedTimeSheet ? selectedTimeSheet.split(" ")[1] : 0;
  const week = year + "-" + monthNumber;
  useEffect(() => {
    if (selectedTimeSheet) {
      viewType === "day"
        ? dispatch(
            fetchGetTimeSheetsDay({
              portalUrl,
              month: currentYearMonth,
              token: token as any,
            }) as any
          )
        : viewType === "week"
        ? dispatch(
            fetchGetTimeSheetsWeek({
              portalUrl,
              week: week,
              token: token as any,
            }) as any
          )
        : dispatch(
            fetchGetTimeSheetsMonth({
              portalUrl,
              month: week,
              token: token as any,
            }) as any
          );
    }
  }, [selectedTimeSheet, viewType]);

  console.log(timeSheetsDataWeek);
  if (isLoading) {
    return <LoadingOverlay visible={true} />;
  } else {
    return (
      <div className="flex flex-col px-4 py-8 space-y-20 mt-10">
        <div className="flex justify-between items-center">
          {currentMonthName === selectedTimeSheet?.split(" ")[0] ? (
            signInData?.TimeSheet_Template === "template2" ? (
              <Button
                onClick={() => navigate(URLTimeSheetsTemplateTwo())}
                variant="outline"
                className="!border-black !text-black !font-semibold"
              >
                New Timesheet
              </Button>
            ) : (
              <Button
                onClick={open}
                variant="outline"
                className="!border-black !text-black !font-semibold"
              >
                New Timesheet
              </Button>
            )
          ) : (
            <div></div>
          )}
          <div className="flex items-center gap-3">
            <Tabs
              variant="unstyled"
              defaultValue="day"
              value={viewType}
              classNames={classes}
              onChange={(value: string | null) =>
                setViewType(
                  value === "day" ? "day" : value === "week" ? "week" : "month"
                )
              }
            >
              <Tabs.List grow>
                <Tabs.Tab value="day">Day</Tabs.Tab>
                <Tabs.Tab value="week">Week</Tabs.Tab>
                <Tabs.Tab value="month">Month</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </div>
        </div>

        <div className="mt-5 relative">
          <TimeSheetTableHeader type={viewType} />
          {viewType === "day" &&
            timeSheetsDataDay &&
            timeSheetsDataDay.map((data, index) => (
              <SingleListDay
                key={index}
                data={data}
                type={viewType}
                id={data.ID}
                week={week}
              />
            ))}
          {viewType === "week" &&
            timeSheetsDataWeek &&
            Object.keys(timeSheetsDataWeek).map((key) =>
              timeSheetsDataWeek[key].map((data, index) => (
                <SingleListWeek
                  key={`${key}-${index}`}
                  data={data}
                  type={viewType}
                  weekKey={key}
                  id={data.ID}
                  week={week}
                />
              ))
            )}
          {viewType === "month" &&
            timeSheetsDataMonth &&
            Object.keys(timeSheetsDataMonth).map((key) =>
              timeSheetsDataMonth[key].map((data, index) => (
                <SingleListMonth
                  key={`${key}-${index}`}
                  data={data}
                  type={viewType}
                  weekKey={key}
                  id={data.ID}
                  week={week}
                />
              ))
            )}
        </div>

        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          size="auto"
          centered
        >
          <NewTimeSheetModal close={close} type={viewType} data={[]} />
        </Modal>
      </div>
    );
  }
};

export default TimeSheetsView;
