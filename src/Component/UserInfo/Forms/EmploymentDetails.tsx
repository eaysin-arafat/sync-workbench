import FormInput from "@/Component/UI/FormElements/FormInput";
import SelectInput from "@/Component/UI/FormElements/SelectInput";
import { VscDash } from "react-icons/vsc";
import UploadFile from "../UploadFile";

const EmploymentDetails = () => {
  return (
    <>
      <h1 className="mb-3">Present Company</h1>

      <div className="grid gap-6">
        <SelectInput label="Company Name" required />
        <FormInput label="Job Title" required />

        <div className={`col-span-1 flex items-center justify-between gap-4`}>
          <FormInput width="320px" type="date" label="Start Date" required />
          <VscDash size={40} className="mt-[22px]" />
          <FormInput width="320px" type="date" label="End Date" />
        </div>

        <div className="flex justify-start gap-16">
          <UploadFile label="Username-Offer Letter" required />
          <UploadFile label="Username-Relieving Letter" required />
        </div>
      </div>
    </>
  );
};

export default EmploymentDetails;
