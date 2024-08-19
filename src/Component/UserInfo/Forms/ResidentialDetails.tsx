import FormInput from "@/Component/UI/FormElements/FormInput";

const ResidentialDetails = () => {
  return (
    <>
      <div>
        <h1 className="mb-3">Current Address</h1>

        <div className="grid gap-3">
          <FormInput label="Street" />

          <FormInput label="City" required />
          <FormInput label="State" required />
          <FormInput label="PIN Code" required />
          <FormInput label="Country" required />
        </div>
      </div>

      <div className="mt-5">
        <h1 className="mb-3">Permanent address</h1>

        <div className="grid gap-3">
          <FormInput label="Street" />

          <FormInput label="City" required />
          <FormInput label="State" required />
          <FormInput label="PIN Code" required />
          <FormInput label="Country" required />
        </div>
      </div>
    </>
  );
};

export default ResidentialDetails;
