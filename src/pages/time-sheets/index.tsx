import TimeSheetCard from "@/component/time-sheets/time-sheet-card";
import { fetchGetTimeSheetsCount } from "@/redux/reducers/time-sheets-slicer";
import { AppDispatch, RootState } from "@/redux/store";
import { rem } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface timesheetCountDataProps {
  month: string;
  count: number;
}

const TimeSheets = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  const dispatch: AppDispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.userReducer);
  const { timeSheetCountData } = useSelector(
    (state: RootState) => state.timeSheetReducer
  ) as { timeSheetCountData: timesheetCountDataProps[] | null };
  const host = window.location.host;
  const subdomain = host.split(".")[0];
  const portalUrl = `${subdomain}.saciahub.com`;
  const icon = (
    <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });

  useEffect(() => {
    dispatch(
      fetchGetTimeSheetsCount({
        year: value?.getFullYear(),
        portalUrl,
        token: token as any,
      }) as any
    ).then((result: any) => {
      console.log("API call result:", result);
    });
  }, [portalUrl, value]);

  return (
    <div className="">
      <div className="flex justify-end">
        <YearPickerInput
          className="w-[200px] mt-10"
          leftSection={icon}
          leftSectionPointerEvents="none"
          placeholder="Pick Year"
          value={value}
          onChange={setValue}
          minDate={new Date(2010, 0, 1)}
          maxDate={new Date()}
        />
      </div>
      <div className="grid grid-cols-4 gap-10 justify-center mt-10">
        {timeSheetCountData &&
          timeSheetCountData?.map((item, index) => (
            <TimeSheetCard
              date={item.month}
              data={item.count}
              key={index}
              newDisabled={item.month.split(" ")[0] !== currentMonthName}
            />
          ))}
      </div>
    </div>
  );
};

export default TimeSheets;
