import { Button, Modal, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NewTimeSheetModal from "@/component/time-sheets/new-time-sheet-modal";
import SingleListDay from "@/component/timesheet-table/single-list-day";
import SingleListMonth from "@/component/timesheet-table/single-list-month";
import SingleListWeek from "@/component/timesheet-table/single-list-week";
import TimeSheetTableHeader from "@/component/timesheet-table/time-sheet-table-header";
import { URLTimeSheetsTemplateTwo } from "@/routes/router-link";
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
  const [viewType, setViewType] = useState("day");

  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });

  const tamplate = "template2";
  return (
    <div className="flex flex-col px-4 py-8 space-y-20 mt-10">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => navigate(URLTimeSheetsTemplateTwo())}
          variant="outline"
          className="!border-black !text-black !font-semibold"
        >
          New Timesheet
        </Button>

        <Button
          onClick={open}
          variant="outline"
          className="!border-black !text-black !font-semibold"
        >
          New Timesheet
        </Button>

        <div></div>

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

        <SingleListDay key={Math.random()} type={viewType} week={"key"} />

        <SingleListWeek
          key={Math.random()}
          data={{} as TimeSheetDataWeek}
          type={viewType}
          weekKey={"key"}
          id={["100"]}
          week={"5"}
        />

        <SingleListMonth
          key={Math.random()}
          data={{} as TimeSheetDataWeek}
          type={viewType}
          weekKey={"key"}
          id={["100"]}
          week={"5"}
        />
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
};

export default TimeSheetsView;
