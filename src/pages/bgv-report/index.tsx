import BackButtonIcon from "@/assets/user-info/BackButtonIcon";
import DownloadIcon from "@/assets/user-info/DownloadIcon";

import EmailIcon from "@/assets/bgv-report/EmailIcon";
import logo from "@/assets/logo.png";

import CriminalRecordsVerification from "@/component/bgv-report/forms/criminal-record-verification";
import DrugTest from "@/component/bgv-report/forms/drug-test";
import EducationVerification from "@/component/bgv-report/forms/education-verification";
import EmploymentVerification from "@/component/bgv-report/forms/employment-verification";
import ExecutiveSummary from "@/component/bgv-report/forms/executive-summary";
import GlobalDatabaseCheck from "@/component/bgv-report/forms/global-database-check";
import IdentityVerification from "@/component/bgv-report/forms/identity-verification";
import CollapsibleContainer from "@/component/ui/collapse";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const BgvReport = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "executive-summery",
      title: "Executive Summery",
      content: <ExecutiveSummary />,
    },
    {
      id: "education-verification",
      title: "Education Verification",
      content: <EducationVerification />,
    },
    {
      id: "employment-verification",
      title: "Employment Verification",
      content: <EmploymentVerification />,
    },
    {
      id: "criminal-records-verification",
      title: "Criminal Records Verification",
      content: <CriminalRecordsVerification />,
    },
    {
      id: "identity-verification",
      title: "Identity Verification",
      content: <IdentityVerification />,
    },
    {
      id: "drug-test",
      title: "Drug Test",
      content: <DrugTest />,
    },
    {
      id: "global-database-check",
      title: "Global Database Check",
      content: <GlobalDatabaseCheck />,
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

        <div className="flex items-center gap-4 rounded-md">
          <Button
            variant="outline"
            className="!border-black !text-black !font-bold"
            leftSection={<EmailIcon />}
          >
            Email
          </Button>

          <Button
            variant="default"
            bg={"black"}
            className="!text-white"
            leftSection={<DownloadIcon />}
          >
            Download
          </Button>
        </div>
      </div>

      <div>
        <div className="py-10 mt-6 mx-11 px-28 bg-white space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <img src={logo} alt="Blackrock It Solution Icon" />
            </div>

            <div className="text-sm w-[160px] flex flex-col">
              <h3 className="font-medium">BlackRock IT Solutions</h3>
              <p>4840 E Jasmine St </p> <p>Suite 105, Mesa, AZ</p>
              <p>85205, United States</p>
              <p className="text-red-600 font-medium">+1 602-613-5388</p>
            </div>
          </div>

          <h1 className="text-xl text-red-600 font-bold">
            Employee Background Verification Report
          </h1>

          <div className="my-5">
            <CollapsibleContainer sections={sections} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BgvReport;
