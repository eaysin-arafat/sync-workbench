import BackButtonIcon from "@/Assets/user-info/BackButtonIcon";
import DownloadIcon from "@/Assets/user-info/DownloadIcon";
import BgBlackButton from "@/Component/UI/Button/BgBlackButton";

import CollapsibleContainer from "@/Component/UI/Collapse/Collapse";
import { useNavigate } from "react-router-dom";
import EducationDetails from "../../Component/UserInfo/Forms/EducationDetails";
import EmploymentDetails from "../../Component/UserInfo/Forms/EmploymentDetails";
import IdentityDetails from "../../Component/UserInfo/Forms/IdentityDetails";
import PersonalDetails from "../../Component/UserInfo/Forms/PersonalDetails";
import ResidentialDetails from "../../Component/UserInfo/Forms/ResidentialDetails";

const UserInfo = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "personal-details",
      title: "Personal Details",
      content: <PersonalDetails />,
    },
    {
      id: "identity-details",
      title: "Identity Details",
      content: <IdentityDetails />,
    },
    {
      id: "residential-details",
      title: "Residential Details",
      content: <ResidentialDetails />,
    },
    {
      id: "education-details",
      title: "Education Details",
      content: <EducationDetails />,
    },
    {
      id: "employment-details",
      title: "Employment Details",
      content: <EmploymentDetails />,
    },
  ];

  return (
    <div className="mt-8 bg-[#FAFAFB]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5 justify-between">
          <button
            className="flex items-center gap-2 font-bold text-sm whitespace-nowrap py-3 pr-2.5"
            onClick={() => navigate(-1)}
          >
            <BackButtonIcon /> Back
          </button>
        </div>

        <div className="flex border rounded-md">
          <BgBlackButton icon={<DownloadIcon />} label="Download" />
        </div>
      </div>

      <div>
        <div className="py-10 mt-6 mx-11 px-28 bg-white space-y-14">
          <h1 className="text-3xl font-bold">User Info</h1>

          <div className="px-3 my-7">
            <CollapsibleContainer sections={sections} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
