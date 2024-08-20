import FormInput from "@/component/ui/form-elements/input";
import FileInput from "@/component/ui/form-elements/upload-file";
import { ChangeEvent } from "react";

export type IdentityDetailsType = {
  UAN_Number: string;
  Re_enter_UAN_Number?: string;
  PAN_Number: string;
  Re_enter_PAN_Number?: string;
  PAN_Image: string;
  Aadhar_Number: string;
  Re_enter_Aadhar_Number?: string;
  Aadhar_Image: string;
  Passport_Number: string;
  Re_enter_Passport_Number?: string;
  Passport_Image: string;
  Passport_FieldNumber: string;
};

const IdentifyDetails = ({
  handleChange,
  formData,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDateChange?: (date: Date | null) => void;
  handlePhoneChange?: (value: string) => void;
  handleSelectChange?: (name: string, value: string | null) => void;
  formData?: Partial<IdentityDetailsType>;
}) => {
  return (
    <>
      <h1 className="text-2xl font-medium pt-4 pb-8">Identity Details</h1>
      <div className="grid gap-6">
        <FormInput
          label="UAN  number"
          name="UAN_Number"
          onChange={handleChange}
          value={formData?.UAN_Number}
          type="number"
          required
        />
        <FormInput
          label="Re-enter UAN number"
          name="Re_enter_UAN_Number"
          type="number"
          value={formData?.Re_enter_UAN_Number}
          onChange={handleChange}
          required
        />
        <FormInput
          type="number"
          label="PAN number"
          name="PAN_Number"
          value={formData?.PAN_Number}
          onChange={handleChange}
          required
        />
        <FormInput
          type="number"
          label="Re-enter PAN number"
          name="Re_enter_PAN_Number"
          value={formData?.Re_enter_PAN_Number}
          onChange={handleChange}
          required
        />

        <FileInput label="PAN Upload" name="PAN_Image" required isEndIcon />

        <FormInput
          type="number"
          label="Aadhar number"
          name="Aadhar_Number"
          value={formData?.Aadhar_Number}
          onChange={handleChange}
          required
        />
        <FormInput
          type="number"
          label="Re-enter Aadhar number"
          name="Re_enter_Aadhar_Number"
          value={formData?.Re_enter_Aadhar_Number}
          onChange={handleChange}
          required
        />

        <FileInput
          label="Upload Aadhar"
          name="Aadhar_Image"
          required
          isEndIcon
        />

        <FormInput
          type="number"
          label="Passport Number"
          name="Passport_Number"
          value={formData?.Passport_Number}
          onChange={handleChange}
          required
        />
        <FormInput
          type="number"
          label="Re-enter Passport Number"
          name="Re_enter_Passport_Number"
          value={formData?.Re_enter_Passport_Number}
          onChange={handleChange}
          required
        />

        <FormInput
          type="number"
          label="Passport file Number"
          name="Passport_FieldNumber"
          value={formData?.Passport_FieldNumber}
          onChange={handleChange}
          required
        />

        <FileInput
          label="Upload Passport"
          name="Passport_Image"
          required
          isEndIcon
        />
      </div>
    </>
  );
};

export default IdentifyDetails;
