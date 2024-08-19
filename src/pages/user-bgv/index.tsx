/* eslint-disable @typescript-eslint/no-explicit-any */
import ApplicationSubmit from "@/Component/UserBGV/Forms/ApplicationSubmit";
import EducationDetails, {
  EducationalDetailsType,
} from "@/Component/UserBGV/Forms/EducationDetails";
import EmploymentDetails, {
  EmploymentDetailsType,
} from "@/Component/UserBGV/Forms/EmploymentDetails";
import IdentifyDetails, {
  IdentityDetailsType,
} from "@/Component/UserBGV/Forms/IdentityDetails";
import PersonalDetails, {
  PersonalDetailsType,
} from "@/Component/UserBGV/Forms/PersonalDetails";
import ResidentialDetails, {
  ResidentialDetailsType,
} from "@/Component/UserBGV/Forms/ResidentialDetails";
import {
  fetchCreateUserBGVForm,
  fetchUpdateUserBGVForm,
  fetchUserBGVData,
} from "@/redux/reducers/user-bgv-slicer";
import { AppDispatch, RootState } from "@/redux/store";
import { URLDashboard } from "@/Routes/router-link";
import { getPortalInfo } from "@/utils/get-protal-info";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { getInitialState } from "./helper/constant";
import { determineCurrentStep } from "./helper/determineCurrentStep";
import { validateStep } from "./helper/validateStep";

export type UserBgvFormDataType = {
  Company_Portal_Url?: string;
  PersonalDetails: PersonalDetailsType;
  IdentityDetails: IdentityDetailsType;
  ResidentialDetails: ResidentialDetailsType;
  EducationalDetails: EducationalDetailsType[];
  EmploymentDetails: EmploymentDetailsType[];
};
type SectionKey = keyof UserBgvFormDataType;
type SectionData = {
  [key: string]: any; // This allows for flexibility within each section
};

const UserBGV = () => {
  const { portalUrl } = getPortalInfo();
  const { userBgvReducer } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { uploadMediaData, userBGVData, isLoading } = userBgvReducer;

  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [formData, setFormData] = useState<UserBgvFormDataType>(
    getInitialState(portalUrl, userBGVData)
  );
  const [isStepValid, setIsStepValid] = useState(false);

  const optionalFields: { [key: string]: string[] } = {
    PersonalDetails: ["Middle_Name"],
    IdentityDetails: [],
    ResidentialDetails: [],
    EducationalDetails: [],
    EmploymentDetails: [],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: SectionKey
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as SectionData),
        [name]: value,
      },
    }));
  };

  const handleDateChange = (
    name: string,
    date: Date | null,
    section: SectionKey
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as SectionData),
        [name]: date ? date?.toISOString().split("T")[0] : "",
      },
    }));
  };

  const handlePhoneChange = (
    value: string | undefined,
    section: SectionKey
  ) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] as SectionData),
          Mobile_Number: value,
        },
      }));
    }
  };

  const handleSelectChange = (
    name: string,
    value: string | null,
    section: SectionKey
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as SectionData),
        [name]: value,
      },
    }));
  };

  const steps = [
    <PersonalDetails
      formData={formData.PersonalDetails}
      handlePhoneChange={(value) => handlePhoneChange(value, "PersonalDetails")}
      handleDateChange={(name, date) =>
        handleDateChange(name, date, "PersonalDetails")
      }
      handleChange={(e) => handleChange(e, "PersonalDetails")}
      handleSelectChange={(name, value) =>
        handleSelectChange(name, value, "PersonalDetails")
      }
    />,
    <IdentifyDetails
      formData={formData.IdentityDetails}
      handlePhoneChange={(value) => handlePhoneChange(value, "IdentityDetails")}
      handleChange={(e) => handleChange(e, "IdentityDetails")}
      handleSelectChange={(name, value) =>
        handleSelectChange(name, value, "IdentityDetails")
      }
    />,
    <ResidentialDetails
      formData={formData.ResidentialDetails}
      handleChange={(e) => handleChange(e, "ResidentialDetails")}
      handlePhoneChange={(value) =>
        handlePhoneChange(value, "ResidentialDetails")
      }
      handleSelectChange={(name, value) =>
        handleSelectChange(name, value, "ResidentialDetails")
      }
    />,
    <EducationDetails formData={formData} setFormData={setFormData} />,
    <EmploymentDetails formData={formData} setFormData={setFormData} />,
    <ApplicationSubmit />,
  ];

  const handleSubmit = async (): Promise<boolean> => {
    const updatedFormData = {
      ...formData.PersonalDetails,
      ...formData.IdentityDetails,
      ...formData.ResidentialDetails,
      EducationDetails: { EducationDetails: formData.EducationalDetails },
      EmploymentDetails: { EmploymentDetails: formData?.EmploymentDetails },
      FirstName: formData.PersonalDetails.First_Name,
      LastName: formData.PersonalDetails.Last_Name,
      MiddleName: formData.PersonalDetails.Middle_Name,
      FatherName: formData.PersonalDetails.Father_Name,
      MobileNumber: formData.PersonalDetails.Mobile_Number,
      Date_of_Birth: formData.PersonalDetails.Date_of_Birth,
      Marital_Status: formData.PersonalDetails.Marital_Status,
      Company_Portal_Url: formData.Company_Portal_Url,
      Passport_Size_Photo: uploadMediaData.Passport_Size_Photo,
      Passport_Image: uploadMediaData.Passport_Image,
      PAN_Image: uploadMediaData.PAN_Image,
      Aadhar_Image: uploadMediaData.Aadhar_Image,
    };

    delete updatedFormData.Re_enter_Aadhar_Number;
    delete updatedFormData.Re_enter_PAN_Number;
    delete updatedFormData.Re_enter_Passport_Number;
    delete updatedFormData.Re_enter_UAN_Number;

    try {
      if (currentStep === 1 && Object.keys(userBGVData).length === 0) {
        await dispatch(fetchCreateUserBGVForm(updatedFormData)).unwrap();
      } else {
        await dispatch(
          fetchUpdateUserBGVForm({
            Company_Portal_Url: portalUrl,
            formData: updatedFormData,
          })
        ).unwrap();
      }
      return true;
    } catch (error) {
      console.error("API call failed", error);
      return false;
    }
  };
  const { errors, isValid } = validateStep(currentStep, steps, optionalFields);

  const handleContinue = async () => {
    if (!isValid) {
      notifications.show({
        title: "Validation Error",
        message: errors.join(", "),
        color: "red",
      });
      return;
    }

    if (currentStep === steps.length) {
      setComplete(true);
      navigate(URLDashboard());
    } else {
      const isSubmitSuccessful = await handleSubmit();
      if (isSubmitSuccessful) {
        setCurrentStep((prev) => prev + 1);
      } else {
        notifications.show({
          color: "red",
          title: "Error",
          message: "Failed to save data. Please try again",
          autoClose: 4000,
        });
      }
    }
  };

  useEffect(() => {
    dispatch(fetchUserBGVData({ Company_Portal_Url: portalUrl }));
  }, []);

  useEffect(() => {
    setIsStepValid(isValid);
  }, [currentStep, formData]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      PersonalDetails: {
        ...prev.PersonalDetails,
        Passport_Size_Photo: uploadMediaData?.Passport_Size_Photo,
      },
      IdentityDetails: {
        ...prev.IdentityDetails,
        PAN_Image: uploadMediaData?.PAN_Image,
        Aadhar_Image: uploadMediaData?.Aadhar_Image,
        Passport_Image: uploadMediaData?.Passport_Image,
      },
    }));
  }, [uploadMediaData]);

  useEffect(() => {
    setCurrentStep(determineCurrentStep(userBGVData));
  }, [userBGVData]);

  return (
    <div className="flex flex-col p-2 min-h-screen px-[10%] pb-10 relative">
      <div className="mx-auto flex flex-col items-cente">
        <img src={logo} alt="" className="mt-[40px]" />
        <button
          className="flex items-center gap-2 absolute font-medium top-[85px] left-52"
          onClick={() => {
            if (currentStep === 1) {
              setCurrentStep(1);
            } else {
              setCurrentStep((prev) => prev - 1);
              setComplete(false);
            }
          }}
        >
          <IoMdArrowBack />
          <span>Go Back</span>
        </button>
      </div>

      <div className="space-y-9 px-96">
        <h1 className="font-medium text-[32px] text-center">
          Complete our application
        </h1>

        <p className="text-gray-400 leading-5 text-[15px] text-center ">
          Finish your application in just a few steps. Provide the required
          information accurately, review your details, and submit. Ensure all
          fields are completed to avoid any delays in processing.
        </p>

        <div className="flex items-center justify-center">
          <div className="flex justify-between w-[600px]">
            {steps?.map((_, i) => {
              const is_complete = i + 1 < currentStep || complete;

              return (
                <div
                  key={i}
                  className={`step-item relative flex flex-col justify-center items-center w-36 cursor-pointer ${
                    currentStep === i + 1 && "active"
                  } ${is_complete && "complete"} `}
                  onClick={() => {
                    if (is_complete) {
                      if (i >= steps.length) {
                        setCurrentStep(steps.length);
                      } else {
                        setCurrentStep(i + 1);
                      }
                    }
                  }}
                >
                  <div
                    className={` w-6 h-6 flex items-center justify-center z-10 relative bg-white rounded-full font-semibold text-white ${
                      !is_complete && "border border-gray-400"
                    } ${is_complete && "!bg-[#0ABB87]"} ${
                      currentStep === i + 1 && "!border-[6px] !border-[#0ABB87]"
                    }`}
                  >
                    <TiTick />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!complete && (
          <div className="flex flex-col px-16 space-y-9">
            <div>{steps[currentStep - 1]}</div>

            <Button
              loading={isLoading}
              loaderProps={{ type: "dots" }}
              className={`btn !bg-[#1E1E1E] !w-full !text-white !py-2.5 !rounded-lg !mx-auto !mt-[18px] ${
                !isStepValid && "!opacity-80 !cursor-not-allowed"
              }`}
              onClick={handleContinue}
              disabled={!isStepValid}
            >
              {currentStep === steps.length ? "Continue" : "Save & Continue"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBGV;
