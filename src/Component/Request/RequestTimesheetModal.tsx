import FileInput from "@/Component/UI/FormElements/FileInput";
import FormInput from "@/Component/UI/FormElements/FormInput";
import { fetchCreateUserRequest } from "@/redux/reducers/userRequestsSlicer";
import { RootState } from "@/redux/store";
import { TimeArray } from "@/Types/types";
import { Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "../Tooltip/Tooltip";

interface InputGroup {
  id: string;
  value: [Date | null, Date | null];
  workHours: number;
}

export interface TimeSheetData {
  ID: number;
  RequestUUID: string;
  RequestType: string;
  RequestDetails: RequestDetails;
  RequestDescription: string;
  RequestPriority?: any;
  RequestStatus: string;
  CreatedOn: string;
}
interface RequestDetails {
  Client: string;
  Project: string;
  Task: string;
  Time: Time[];
}
interface Time {
  StartDate: string;
  EndDate: string;
  Hours: number;
}

const RequestViewTimeSheetModal = ({
  close,
  data,
}: {
  close: () => void;
  data: TimeSheetData;
}) => {
  const isEdit = !!data;
  console.log("data", data?.RequestDetails?.Client);
  console.log("isEdit", isEdit);

  const dispatch = useDispatch();
  const [inputGroups, setInputGroups] = useState<
    { id: number; value: [Date | null, Date | null]; workHours: number }[]
  >([{ id: Date.now(), value: [null, null], workHours: 0 }]);
  const { role } = useSelector((state: RootState) => state.userReducer);
  const host = window.location.host;
  const subdomain = host.split(".")[0];
  const portalUrl: string = `${subdomain}.saciahub.com`;

  const { uploadMediaData } = useSelector(
    (state: RootState) => state.userBgvReducer
  );
  const [clientName, setClientName] = useState<string>(
    isEdit ? data?.RequestDetails?.Client : ""
  );
  const [projectName, setProjectName] = useState<string>(
    isEdit ? data?.RequestDetails?.Project : ""
  );
  const [notes, setNotes] = useState<string>(
    isEdit ? data?.RequestDescription : ""
  );
  const [task, setTask] = useState<string>(
    isEdit ? data?.RequestDetails?.Task : ""
  );

  const handleAddInputGroup = () => {
    setInputGroups([
      ...inputGroups,
      { id: Date.now(), value: [null, null], workHours: 0 },
    ]);
  };

  const calculateWorkHours = (startDate: Date, endDate: Date) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays =
      Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay)) +
      1;
    return diffDays * 8;
  };

  const handleDateChange = (
    id: number,
    dateRange: [Date | null, Date | null]
  ) => {
    setInputGroups((prev) =>
      prev.map((group) =>
        group.id === id
          ? {
              ...group,
              value: dateRange,
              workHours:
                dateRange[0] && dateRange[1]
                  ? calculateWorkHours(dateRange[0], dateRange[1])
                  : 0,
            }
          : group
      )
    );
  };

  const formatDate = (date: Date | null): string => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }
    return "";
  };

  const handleSubmit = () => {
    const time: TimeArray = inputGroups
      .map((group) => {
        const [startDate, endDate] = group.value;
        if (startDate && endDate) {
          const start = formatDate(startDate);
          const end = formatDate(endDate);
          return [
            {
              StartDate: start,
              EndDate: end,
              HoursWorked: group.workHours,
            },
          ];
        }
        return [];
      })
      .reduce((acc, curr) => acc.concat(curr), []);

    dispatch(
      fetchCreateUserRequest({
        Company_Portal_Url: portalUrl,
        ClientName: clientName,
        ProjectName: projectName,
        Task: task,
        RequestAttachmentURL: uploadMediaData?.attachment,
        endDate: time?.map((item) => item?.EndDate),
        Hours: time?.map((item) => item?.HoursWorked),
        RequestDescription: "",
        RequestPriority: "",
        RequestType: "TimeSheet",
        startDate: time?.map((item) => item?.StartDate),
        Type: "",
      }) as any
    )
      .unwrap()
      .then((data: any) => {
        if (data.status === 201) {
          notifications.show({
            color: "blue",
            title: "Success",
            message: "Timesheet created successfully",
            autoClose: 4000,
          });
          close();
        } else {
          console.error("Timesheet creation failed:", data);
        }
      })
      .catch((error: any) => {
        console.error("Error creating timesheet:", error);
        notifications.show({
          color: "red",
          title: "Error",
          message: error.message,
          autoClose: 4000,
        });
      });
  };

  const getCurrentWeekRange = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const startOfWeek = new Date(now.setDate(now.getDate() - dayOfWeek + 1));
    const endOfWeek = new Date(now.setDate(now.getDate() - dayOfWeek + 7));

    startOfWeek.setHours(0, 0, 0, 0);
    endOfWeek.setHours(23, 59, 59, 999);
    return { startOfWeek, endOfWeek };
  };

  const { startOfWeek, endOfWeek } = getCurrentWeekRange();
  const now = new Date();
  const maxDate = now < endOfWeek ? now : endOfWeek;

  return (
    <div className="px-5 py-5">
      <div className="grid grid-cols-2 gap-5">
        {role === "user" && (
          <FormInput
            label="Client"
            placeholder="Client Name"
            width="426px"
            required
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        )}
        <FormInput
          label="Project Name"
          width="426px"
          required
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <FormInput
          label="Task"
          width="426px"
          required
          placeholder="Type"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <FileInput label="Attachment" name="attachment" isEndIcon />
        {inputGroups.map((group) => (
          <div key={group.id} className="col-span-2 flex gap-5">
            <div className="w-1/2">
              <div className="font-semibold flex items-center gap-1">
                Pick Dates Range{" "}
                <Tooltip text="If you want to select a single date, then you need to click the date twice!" />
              </div>
              <DatePickerInput
                type="range"
                placeholder="Pick Dates Range"
                value={group.value}
                onChange={(dateRange) => handleDateChange(group.id, dateRange)}
                allowSingleDateInRange
                styles={{
                  input: { height: "45px" },
                  label: { fontSize: "15px" },
                }}
                maxDate={maxDate}
                minDate={startOfWeek}
              />
            </div>
            <div className="w-1/2 mt-0">
              <FormInput
                label="Work Hours"
                value={group.workHours.toString()}
                required
              />
            </div>
          </div>
        ))}
        <FormInput
          label="Notes"
          width="426px"
          required
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="col-span-2">
          <Button variant="outline" onClick={handleAddInputGroup}>
            <IconPlus size={20} />
          </Button>
        </div>
      </div>

      <div className="flex gap-5 mt-8">
        <Button
          onClick={close}
          variant="outline"
          className="!border-black !text-black !font-bold"
        >
          Close
        </Button>
        <Button
          className="!bg-black text-white !font-bold !text-sm"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default RequestViewTimeSheetModal;
