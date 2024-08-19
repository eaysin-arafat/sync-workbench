import { ChangeEvent } from "react";
import { default as FormInput } from "../../../Component/UI/FormElements/FormInput";
import Select from "../../../Component/UI/FormElements/SelectInput";

export type ResidentialDetailsType = {
  CurrentAddress_Street: string;
  CurrentAddress_City: string;
  CurrentAddress_State: string;
  CurrentAddress_PINcode: string;
  CurrentAddress_Country: string;
  PermanentAddress_Street: string;
  PermanentAddress_City: string;
  PermanentAddress_State: string;
  PermanentAddress_PINcode: string;
  PermanentAddress_Country: string;
};

const ResidentialDetails = ({
  handleChange,
  formData,
  handleSelectChange,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDateChange?: (date: Date | null) => void;
  handlePhoneChange: (value: string | undefined) => void;
  handleSelectChange?: (name: string, value: string | null) => void;
  formData?: Partial<ResidentialDetailsType>;
}) => {
  return (
    <>
      <h1 className="text-2xl font-medium pt-4 pb-8">Residential Details</h1>
      <div className="grid gap-6">
        <div className="w-full">
          <div className="text-base font-normal mb-6 truncate">
            <span>Current Address</span>
            <span className="transform -translate-y-0.5 mx-1 text-red-600 text-base">
              *
            </span>
          </div>

          <div className="grid gap-6">
            <FormInput
              label="Street"
              name="CurrentAddress_Street"
              value={formData?.CurrentAddress_Street}
              onChange={handleChange}
            />
            <FormInput
              label="City"
              name="CurrentAddress_City"
              value={formData?.CurrentAddress_City}
              onChange={handleChange}
            />
            <FormInput
              label="State"
              name="CurrentAddress_State"
              value={formData?.CurrentAddress_State}
              onChange={handleChange}
            />
            <FormInput
              label="PIN code"
              name="CurrentAddress_PINcode"
              value={formData?.CurrentAddress_PINcode}
              onChange={handleChange}
            />
            <Select
              label="Country"
              name="CurrentAddress_Country"
              value={formData?.CurrentAddress_Country || ""}
              onChange={handleSelectChange}
              options={["UK", "India", "BD"]}
            />
          </div>
        </div>

        <div className="w-full">
          <div className="text-base font-normal mb-6 truncate">
            <span>Permanent address</span>
            <span className="transform -translate-y-0.5 mx-1 text-red-600 text-base">
              *
            </span>
          </div>

          <div className="grid gap-6">
            <FormInput
              label="Street"
              name="PermanentAddress_Street"
              value={formData?.PermanentAddress_Street}
              onChange={handleChange}
            />
            <FormInput
              label="City"
              name="PermanentAddress_City"
              value={formData?.PermanentAddress_City}
              onChange={handleChange}
            />

            <FormInput
              label="State"
              name="PermanentAddress_State"
              value={formData?.PermanentAddress_State}
              onChange={handleChange}
            />
            <FormInput
              type="number"
              label="PIN code"
              name="PermanentAddress_PINcode"
              value={formData?.PermanentAddress_PINcode}
              onChange={handleChange}
            />
            <Select
              label="Country"
              name="PermanentAddress_Country"
              value={formData?.PermanentAddress_Country || ""}
              onChange={handleSelectChange}
              options={["UK", "India", "BD"]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResidentialDetails;
