import FormInput from "@/Component/UI/FormElements/FormInput";
import TextareaInput from "@/Component/UI/FormElements/TextareaInput";
import { Button } from "@mantine/core";

const CreateRequests = () => {
  return (
    <div className="px-5 py-5 space-y-5 w-[800px]">
      <div className="grid grid-cols-2 gap-5">
        <FormInput label="Name" />
        <FormInput label="Position" />
        <FormInput label="Access" />
        <FormInput label="Priority" />

        <TextareaInput label="Description" required />
        <FormInput type="date" label="Date" />
      </div>

      <div className="flex gap-5">
        <Button
          variant="outline"
          className="!border-black !text-black !font-bold"
        >
          Cancel
        </Button>{" "}
        <button className="px-8 py-3 rounded-md bg-black text-white font-semibold text-sm">
          Send Requests
        </button>
      </div>
    </div>
  );
};

export default CreateRequests;
