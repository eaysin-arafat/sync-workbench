import FormInput from "@/Component/UI/FormElements/FormInput";
import PhoneNumberInput from "@/Component/UI/FormElements/PhoneNumberInput";
import SelectInput from "@/Component/UI/FormElements/SelectInput";
import UploadFile from "../upload-file";

const PersonalDetails = () => {
  return (
    <div className="grid gap-6">
      <FormInput label="First name" placeholder="Type First Name" required />
      <FormInput label="Middle name" placeholder="Type First Name" required />
      <FormInput label="Last name" placeholder="Type First Name" required />
      <FormInput label="Father name" placeholder="Type First Name" required />
      <PhoneNumberInput
        value=""
        setValue={() => {}}
        label="Mobile number"
        required
      />

      <SelectInput
        label="Marital Status"
        options={["Single", "Married"]}
        required
      />
      <div>
        <UploadFile label="Passport Size photo" required />
      </div>
    </div>
  );
};

export default PersonalDetails;
