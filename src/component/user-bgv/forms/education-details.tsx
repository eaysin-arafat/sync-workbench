import FileInput from "@/Component/UI/FormElements/FileInput";
import FormInput from "@/Component/UI/FormElements/FormInput";
import SelectInput from "@/Component/UI/FormElements/SelectInput";
import { UserBgvFormDataType } from "@/Pages/UserBGV";
import { Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { VscDash } from "react-icons/vsc";

export type EducationalDetailsType = {
  EducationType: string;
  InstitutionName: string;
  Degree: string;
  Department: string;
  StartDate: string;
  EndDate: string;
  Education_Certificate_Image: string;
  Transcriptions_Image: string;
};

const EducationDetails = ({
  formData,
  setFormData,
}: {
  formData: UserBgvFormDataType;
  setFormData: React.Dispatch<React.SetStateAction<UserBgvFormDataType>>;
}) => {
  const addEducationForm = () => {
    setFormData((prev) => ({
      ...prev,
      EducationalDetails: [
        ...prev.EducationalDetails,
        {
          EducationType: "",
          InstitutionName: "",
          Degree: "",
          Department: "",
          StartDate: "",
          EndDate: "",
          Education_Certificate_Image: "",
          Transcriptions_Image: "",
        },
      ],
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedForms = formData.EducationalDetails.map((form, i) =>
      i === index ? { ...form, [event.target.name]: event.target.value } : form
    );

    setFormData((prev) => ({
      ...prev,
      EducationalDetails: updatedForms,
    }));
  };

  const handleSelectChange = (
    name: string,
    value: string | null,
    index: number
  ) => {
    console.log({ value, name });

    const updatedForms = formData.EducationalDetails.map((form, i) =>
      i === index ? { ...form, [name]: value || "" } : form
    );

    setFormData((prev) => ({
      ...prev,
      EducationalDetails: updatedForms,
    }));
  };

  const handleDateChange = (name: string, date: Date | null, index: number) => {
    const updatedForms = formData.EducationalDetails.map((form, i) =>
      i === index
        ? { ...form, [name]: date ? date.toISOString().split("T")[0] : "" }
        : form
    );

    setFormData((prev) => ({
      ...prev,
      EducationalDetails: updatedForms,
    }));
  };

  return (
    <div>
      {formData?.EducationalDetails.map((data, index) => (
        <>
          <div className="pt-4 pb-5">
            <h1 className="text-2xl font-medium">Education details</h1>
            <p className="text-gray-400 text-xs">
              (Need all education details, Primary, Secondary, Bachelors,
              Masters)
            </p>
          </div>
          <div className="space-y-6">
            <div className="grid gap-6">
              <SelectInput
                label="Education type"
                name="EducationType"
                value={data?.EducationType}
                onChange={(_name, value) =>
                  handleSelectChange("EducationType", value, index)
                }
                placeholder="Select education type"
                options={["Primary", "Secondary", "Bachelors", "Masters"]}
                required
              />
              <FormInput
                label="Institution name"
                name="InstitutionName"
                value={data?.InstitutionName}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <FormInput
                label="Degree"
                name="Degree"
                value={data?.Degree}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <FormInput
                label="Department"
                name="Department"
                value={data?.Department}
                onChange={(e) => handleChange(e, index)}
                required
              />
              <div className="flex items-center gap-4">
                <DatePickerInput
                  label="Start Date"
                  name="StartDate"
                  onChange={(date) =>
                    handleDateChange("StartDate", date, index)
                  }
                  styles={{ input: { height: "45px" } }}
                  placeholder="Pick date"
                  value={data?.StartDate ? new Date(data.StartDate) : null}
                />
                <VscDash size={40} className="mt-[22px]" />
                <DatePickerInput
                  label="End Date"
                  name="EndDate"
                  onChange={(date) => handleDateChange("EndDate", date, index)}
                  styles={{ input: { height: "45px" } }}
                  placeholder="Pick date"
                  value={data?.EndDate ? new Date(data.EndDate) : null}
                />
              </div>
              <FileInput
                label="Education Certificates"
                name="EducationCertificates"
                required
                isEndIcon
              />
              <FileInput
                label="Transcripts"
                name="Transcripts"
                required
                isEndIcon
              />
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
        Add Education
      </Button>
    </div>
  );
};

export default EducationDetails;
