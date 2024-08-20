import { HiCheckCircle } from "react-icons/hi";

const ApplicationSubmit = () => {
  return (
    <div className="border rounded-3xl flex flex-col items-center justify-center py-16 mx-10">
      <HiCheckCircle className="h-28 w-28 text-[#696969]" />
      <p className="text-xl font-medium">Application Submitted Successfully</p>
    </div>
  );
};

export default ApplicationSubmit;
