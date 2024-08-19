import FormInput from "@/Component/UI/FormElements/FormInput";
import SelectInput from "@/Component/UI/FormElements/SelectInput";
import { VscDash } from "react-icons/vsc";
import UploadFile from "../UploadFile";

const EducationDetails = () => {
  return (
    <>
      <div className="grid gap-6">
        <SelectInput label="Education Type" required />
        <FormInput label="Institution Name" required />
        <FormInput label="Degree" required />
        <FormInput label="Department" required />

        <div className={`col-span-1 flex items-center justify-between gap-4`}>
          <FormInput width="320px" type="date" label="Start Date" required />
          <VscDash size={40} className="mt-[22px]" />
          <FormInput width="320px" type="date" label="End Date" />
        </div>

        <div className="flex justify-start gap-16">
          <UploadFile label="Username-Education Certificates" required />
          <UploadFile label="Username-Transcripts" required />
        </div>
      </div>
    </>
  );
};

export default EducationDetails;
