import FormInput from "@/component/ui/form-elements/input";
import FileInput from "@/component/ui/form-elements/upload-file";
import { UserBgvFormDataType } from "@/pages/user-bgv";
import { Button, Checkbox } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { VscDash } from "react-icons/vsc";

export type EmploymentDetailsType = {
  CompanyName: string;
  JobTitle: string;
  StartDate: string;
  EndDate: string;
  OfferLetterImage: string;
  RelievingletterImage: string;
  CurrentlyWorking: boolean;
};

const EmploymentDetails = ({
  formData,
  setFormData,
}: {
  formData: UserBgvFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<UserBgvFormDataType>>;
}) => {
  const addEducationForm = () => {
    setFormData((prev) => ({
      ...prev,
      EmploymentDetails: [
        ...prev.EmploymentDetails,
        {
          CompanyName: "",
          EndDate: "",
          JobTitle: "",
          OfferLetterImage: "",
          RelievingletterImage: "",
          StartDate: "",
          CurrentlyWorking: false,
        },
      ],
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, type, checked, value } = event.target;

    const updatedForms = formData.EmploymentDetails.map((form, i) =>
      i === index
        ? { ...form, [name]: type === "checkbox" ? checked : value }
        : form
    );

    setFormData((prev) => ({
      ...prev,
      EmploymentDetails: updatedForms,
    }));
  };

  const handleDateChange = (name: string, date: Date | null, index: number) => {
    const updatedForms = formData.EmploymentDetails.map((form, i) =>
      i === index
        ? { ...form, [name]: date ? date.toISOString().split("T")[0] : "" }
        : form
    );

    setFormData((prev) => ({
      ...prev,
      EmploymentDetails: updatedForms,
    }));
  };

  return (
    <div className="space-y-6">
      {formData?.EmploymentDetails?.map((form, index) => (
        <>
          <div className="pt-4 pb-5">
            <h1 className="text-2xl font-medium">Employment Details</h1>
            <p className="text-gray-400 text-xs">
              (All employment details are mandatory, Present to Past)
            </p>
          </div>
          <div className="grid gap-6">
            <div className="w-full">
              <div className="text-base font-normal mb-6 truncate">
                Present Company
              </div>

              <div className="grid gap-6">
                <FormInput
                  label="Company Name"
                  name="CompanyName"
                  value={form.CompanyName}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
                <FormInput
                  label="Job tittle"
                  name="JobTitle"
                  value={form?.JobTitle}
                  onChange={(e) => handleChange(e, index)}
                  required
                />

                <div className="flex items-center gap-4">
                  <DatePickerInput
                    label="Start Date"
                    name="dateRange"
                    onChange={(date) =>
                      handleDateChange("StartDate", date, index)
                    }
                    styles={{
                      input: {
                        height: "45px",
                      },
                    }}
                    placeholder="Pick date"
                    value={form?.StartDate ? new Date(form?.StartDate) : null}
                  />
                  <VscDash size={40} className="mt-[22px]" />
                  <DatePickerInput
                    label="End Date"
                    name="EndDate"
                    onChange={(date) =>
                      handleDateChange("StartDate", date, index)
                    }
                    styles={{
                      input: {
                        height: "45px",
                      },
                    }}
                    placeholder="Pick date"
                    value={form?.EndDate ? new Date(form?.EndDate) : null}
                  />
                </div>
                <FileInput
                  label="Offer Letter"
                  name="Offer_Letter_Image"
                  required
                  isEndIcon
                />
                <FileInput
                  label="Relieving letter"
                  name="Relieving_Letter_Image"
                  required
                  isEndIcon
                />

                <Checkbox
                  label="Currently working on this position"
                  color="black"
                  name="CurrentlyWorking"
                  checked={form?.CurrentlyWorking}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
            </div>
          </div>
        </>
      ))}

      <Button
        variant="outline"
        className="!w-full !mt-6"
        color="black"
        onClick={addEducationForm}
      >
        Add Experience
      </Button>
    </div>
  );
};

export default EmploymentDetails;
