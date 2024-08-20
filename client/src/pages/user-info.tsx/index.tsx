import DownloadIcon from "@/assets/second-dashboard/DownloadIcon";
import BackButtonIcon from "@/assets/user-info/BackButtonIcon";
import BgBlackButton from "@/component/ui/button";
import CollapsibleContainer from "@/component/ui/collapse";
import EducationDetails from "@/component/user-Info/forms/education-details";
import EmploymentDetails from "@/component/user-Info/forms/employment-details";
import IdentityDetails from "@/component/user-Info/forms/identity-details";
import PersonalDetails from "@/component/user-Info/forms/personal-details";
import ResidentialDetails from "@/component/user-Info/forms/residential-details";
import { useNavigate } from "react-router-dom";

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
