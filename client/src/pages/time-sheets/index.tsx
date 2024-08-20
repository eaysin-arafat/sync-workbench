import TimeSheetCard from "@/component/time-sheets/time-sheet-card";
import { rem } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";

export interface timesheetCountDataProps {
  month: string;
  count: number;
}

const TimeSheets = () => {
  const [value, setValue] = useState<Date | null>(new Date());

  const icon = (
    <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 justify-center mt-10">
        {[2, 5, 8, 8, 10, 8, 1]?.map((item, index) => (
          <TimeSheetCard
            date={"January"}
            data={5}
            key={index}
            newDisabled={false}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSheets;
