import FormInput from "@/component/ui/form-elements/input";
import UploadFile from "../upload-file";

const IdentityDetails = () => {
  return (
    <>
      <div className="grid gap-6">
        <FormInput label="UAN Number" placeholder="Type First Name" required />
        <FormInput
          label="Re-enter UAN Number"
          placeholder="Type First Name"
          required
        />
        <FormInput label="PAN Number" placeholder="Type First Name" required />
        <FormInput label="Father name" placeholder="Type First Name" required />
        <div>
          <UploadFile label="Username-PAN" required />
        </div>
        <FormInput
          label="Aadhar Number"
          placeholder="Type First Name"
          required
        />

        <div>
          <UploadFile label="Username-Asdhar" required />
        </div>
      </div>
    </>
  );
};

export default IdentityDetails;
