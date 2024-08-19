import FormInput from "@/Component/UI/FormElements/FormInput";
import { default as SelectInput } from "@/Component/UI/FormElements/SelectInput";
import TextareaInput from "@/Component/UI/FormElements/TextareaInput";
import { RequestType } from "@/Types/requestType";
import { Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { RequestListType } from "../request-table/request-single-list";
import Tooltip from "../tooltip";
import useRequestViewModal from "./useRequestViewModal";

type Props = {
  close: () => void;
  type: RequestType;
  data?: RequestListType | null;
};

const RequestViewModal = ({ close, type, data }: Props) => {
  const {
    formState,
    handleChange,
    handleSelectChange,
    handleSubmit,
    requestTypeLabel,
    setRangeValue,
    withoutTimeOffType,
    rangeValue,
  } = useRequestViewModal({ close, type, data });

  return (
    <form className="px-5 py-5 space-y-9" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-5">
        {type === "time-off" && (
          <FormInput
            width="426px"
            label="Reason"
            required
            name="requestDescription"
            value={formState.requestDescription}
            onChange={handleChange}
          />
        )}

        <FormInput
          label={requestTypeLabel || ""}
          name="type"
          value={formState.type}
          onChange={handleChange}
          required
        />

        {withoutTimeOffType && (
          <>
            <SelectInput
              label="Priority"
              options={["High", "Medium", "Low"]}
              name="requestPriority"
              value={formState.requestPriority}
              onChange={handleSelectChange}
              required
            />
            <TextareaInput
              label="Description"
              placeholder="Description"
              width="426px"
              height="150px"
              name="requestDescription"
              value={formState.requestDescription}
              onChange={handleChange}
            />
          </>
        )}

        {type === "time-off" && (
          <div>
            <div className="font-semibold flex items-center gap-1">
              Pick Dates Range{" "}
              <Tooltip text="If you want to select a single date, then you need to cilck the date twice!" />
            </div>
            <DatePickerInput
              type="range"
              placeholder="Pick date range"
              styles={{ input: { height: "45px" } }}
              value={rangeValue}
              onChange={setRangeValue}
              style={{ width: "100%" }}
              allowSingleDateInRange
              minDate={new Date()}
            />
          </div>
        )}
      </div>

      <div className="flex gap-5">
        <Button
          onClick={close}
          variant="outline"
          className="!border-black !text-black !font-bold"
        >
          Cancel
        </Button>

        <Button
          className=" !bg-black text-white !font-bold !text-sm"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RequestViewModal;
