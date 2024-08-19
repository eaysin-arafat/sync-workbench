import {
  URLTimeSheetsTemplateTwo,
  URLTimeSheetsView,
} from "@/routes/router-link";
import { Button, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BsThreeDots } from "react-icons/bs";
import { FaCalendarDays } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import NewTimeSheetModal from "./new-time-sheet-modal";

type TimeSheetCardProps = {
  date: string;
  data: number;
  bottomLabel?: string;
  newDisabled?: boolean;
};

const TimeSheetCard = ({
  date,
  data,
  bottomLabel,
  newDisabled,
}: TimeSheetCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const tamplage = "template2";

  return (
    <div className="bg-white border rounded-[5px] p-8 flex flex-col justify-center items-center">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex gap-2 items-center">
          <p className="font-semibold">{date}</p>
          <FaCalendarDays color="red" />
        </div>
        <Menu shadow="md" position="bottom-start">
          <Menu.Target>
            <Button
              type="button"
              className="text-sm"
              size="xs"
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              <BsThreeDots />
            </Button>
          </Menu.Target>
          <Menu.Dropdown
            style={{
              width: "140px",
            }}
          >
            {newDisabled ? (
              <>
                <Menu.Item onClick={() => navigate(URLTimeSheetsView())}>
                  View Timesheet
                </Menu.Item>
              </>
            ) : (
              <>
                {tamplage === "template2" ? (
                  <Menu.Item
                    onClick={() => {
                      navigate(URLTimeSheetsTemplateTwo());
                    }}
                  >
                    New Timesheet
                  </Menu.Item>
                ) : (
                  <Menu.Item onClick={() => open()}>New Timesheet</Menu.Item>
                )}
                <Menu.Item onClick={() => navigate(URLTimeSheetsView())}>
                  View Timesheet
                </Menu.Item>
              </>
            )}
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className="text-[32px] font-semibold mb-5">{data}</div>
      <p className="text-[12px] text-[#A1A1A1]">{bottomLabel}</p>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="auto"
        centered
      >
        <NewTimeSheetModal close={close} type="single" data={[]} />
      </Modal>
    </div>
  );
};

export default TimeSheetCard;
