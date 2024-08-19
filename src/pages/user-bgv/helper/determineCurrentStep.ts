import { EducationalDetailsType } from "@/Component/UserBGV/Forms/EducationDetails";
import { EmploymentDetailsType } from "@/Component/UserBGV/Forms/EmploymentDetails";
import { IdentityDetailsType } from "@/Component/UserBGV/Forms/IdentityDetails";
import { PersonalDetailsType } from "@/Component/UserBGV/Forms/PersonalDetails";
import { ResidentialDetailsType } from "@/Component/UserBGV/Forms/ResidentialDetails";

export type UserBgvFormDataType = {
  PersonalDetails: PersonalDetailsType;
  IdentityDetails: IdentityDetailsType;
  ResidentialDetails: ResidentialDetailsType;
  EducationalDetails: EducationalDetailsType;
  EmploymentDetails: EmploymentDetailsType;
};

interface RequiredFields {
  PersonalDetails: (keyof UserBgvFormDataType["PersonalDetails"])[];
  IdentityDetails: (keyof UserBgvFormDataType["IdentityDetails"])[];
  ResidentialDetails: (keyof UserBgvFormDataType["ResidentialDetails"])[];
  EducationalDetails: (keyof UserBgvFormDataType["EducationalDetails"])[];
  EmploymentDetails: (keyof UserBgvFormDataType["EmploymentDetails"])[];
}

const requiredFields: RequiredFields = {
  PersonalDetails: [
    "First_Name",
    "Last_Name",
    "Father_Name",
    "Mobile_Number",
    "Marital_Status",
    "Date_of_Birth",
    "Passport_Size_Photo",
  ],
  IdentityDetails: [
    "Passport_Number",
    "Passport_Image",
    "Passport_FieldNumber",
    "UAN_Number",
    "PAN_Number",
    "PAN_Image",
    "Aadhar_Number",
    "Aadhar_Image",
  ],
  ResidentialDetails: [
    "CurrentAddress_Street",
    "CurrentAddress_City",
    "CurrentAddress_State",
    "CurrentAddress_PINcode",
    "CurrentAddress_Country",
    "PermanentAddress_Street",
    "PermanentAddress_City",
    "PermanentAddress_State",
    "PermanentAddress_PINcode",
    "PermanentAddress_Country",
  ],
  EducationalDetails: [],
  EmploymentDetails: [],
};

const isSectionComplete = (
  sectionData: any,
  requiredFields: string[]
): boolean => {
  return requiredFields.every((field) => {
    const value = sectionData[field];
    return value !== "" && value !== null && value !== undefined;
  });
};

export const determineCurrentStep = (userData: any): number => {
  const formData: UserBgvFormDataType = {
    PersonalDetails: {
      First_Name: userData.FirstName || "",
      Last_Name: userData.LastName || "",
      Middle_Name: userData.MiddleName || "",
      Father_Name: userData.FatherName || "",
      Mobile_Number: userData.MobileNumber || "",
      Marital_Status: userData.Marital_Status || "",
      Date_of_Birth: userData.Date_of_Birth || "",
      Passport_Size_Photo: userData.Passport_Size_Photo || "",
    },
    IdentityDetails: {
      Passport_Number: userData.Passport_Number || "",
      Re_enter_Passport_Number: "", // Assuming this field should be checked separately
      Passport_Image: userData.Passport_Image || "",
      Passport_FieldNumber: userData.Passport_FieldNumber || "",
      UAN_Number: userData.UAN_Number || "",
      Re_enter_UAN_Number: "", // Assuming this field should be checked separately
      PAN_Number: userData.PAN_Number || "",
      Re_enter_PAN_Number: "", // Assuming this field should be checked separately
      PAN_Image: userData.PAN_Image || "",
      Aadhar_Number: userData.Aadhar_Number || "",
      Re_enter_Aadhar_Number: "", // Assuming this field should be checked separately
      Aadhar_Image: userData.Aadhar_Image || "",
    },
    ResidentialDetails: {
      CurrentAddress_Street: userData.CurrentAddress_Street || "",
      CurrentAddress_City: userData.CurrentAddress_City || "",
      CurrentAddress_State: userData.CurrentAddress_State || "",
      CurrentAddress_PINcode: userData.CurrentAddress_PINcode || "",
      CurrentAddress_Country: userData.CurrentAddress_Country || "",
      PermanentAddress_Street: userData.PermanentAddress_Street || "",
      PermanentAddress_City: userData.PermanentAddress_City || "",
      PermanentAddress_State: userData.PermanentAddress_State || "",
      PermanentAddress_PINcode: userData.PermanentAddress_PINcode || "",
      PermanentAddress_Country: userData.PermanentAddress_Country || "",
    },
    EducationalDetails: userData.EducationType || {},
    EmploymentDetails: userData.EmployTitle || {},
  };

  const sectionKeys: (keyof UserBgvFormDataType)[] = [
    "PersonalDetails",
    "IdentityDetails",
    "ResidentialDetails",
    "EducationalDetails",
    "EmploymentDetails",
  ];

  for (let i = 0; i < sectionKeys.length; i++) {
    const sectionKey = sectionKeys[i];
    const sectionData = formData[sectionKey];
    if (!isSectionComplete(sectionData, requiredFields[sectionKey])) {
      return i + 1;
    }
  }

  // All steps completed
  return sectionKeys.length + 1;
};
