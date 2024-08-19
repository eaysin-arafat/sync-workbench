import FileInput from "@/Component/UI/FormElements/FileInput";
import FormInput from "@/Component/UI/FormElements/FormInput";
import PhoneNumberInput from "@/Component/UI/FormElements/PhoneNumberInput";
import Select from "@/Component/UI/FormElements/SelectInput";
import { DatePickerInput } from "@mantine/dates";
import { ChangeEvent } from "react";

export type PersonalDetailsType = {
  First_Name: string;
  Last_Name: string;
  Middle_Name: string;
  Father_Name: string;
  Mobile_Number: string;
  Marital_Status: string;
  Date_of_Birth: Date | null;
  Passport_Size_Photo: string;
};

const PersonalDetails = ({
  handleChange,
  handleDateChange,
  handlePhoneChange,
  handleSelectChange,
  formData,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (name: string, date: Date | null) => void;
  handlePhoneChange: (value: string | undefined) => void;
  handleSelectChange?: (name: string, value: string | null) => void;
  formData: Partial<PersonalDetailsType>;
}) => {
  return (
    <>
      <h1 className="text-2xl font-medium pt-4 pb-8">Personal details</h1>
      <div className="grid gap-6">
        <FormInput
          label="First name"
          placeholder="Type First Name"
          name="First_Name"
          onChange={handleChange}
          value={formData.First_Name}
          required
        />

        <FormInput
          label="Middle name"
          name="Middle_Name"
          onChange={handleChange}
          value={formData.Middle_Name}
          placeholder="Type First Name"
          required
        />

        <FormInput
          label="Last name"
          name="Last_Name"
          value={formData.Last_Name}
          onChange={handleChange}
          placeholder="Type First Name"
          required
        />

        <DatePickerInput
          label="Date Of Birth"
          name="Date_of_Birth"
          defaultValue={
            formData?.Date_of_Birth ? new Date(formData?.Date_of_Birth) : null
          }
          onChange={(date) => handleDateChange("Date_of_Birth", date)}
          styles={{
            input: {
              height: "45px",
            },
          }}
          placeholder="Pick date"
        />

        <FormInput
          label="Father name"
          name="Father_Name"
          value={formData.Father_Name}
          onChange={handleChange}
          placeholder="Type First Name"
          required
        />

        <PhoneNumberInput
          label="Mobile number"
          value={formData?.Mobile_Number || ""}
          setValue={handlePhoneChange}
          required
        />

        <Select
          label="Marital status"
          placeholder="Select Marital Status"
          required
          name="Marital_Status"
          value={formData?.Marital_Status || ""}
          onChange={handleSelectChange}
          options={["Single", "Married"]}
        />

        <FileInput
          label="Passport Size photo"
          name="Passport_Size_Photo"
          required
          isEndIcon
        />
      </div>
    </>
  );
};

export default PersonalDetails;
