import { Select } from "@mantine/core";
import { Link } from "react-router-dom";
import completed from "../../assets/application-icon/completed.png";
import emailVerified from "../../assets/application-icon/email-verified.png";
import pending from "../../assets/application-icon/pending.png";
import total from "../../assets/application-icon/total.png";

import TableBody from "@/component/admin-dashboard/table-body";
import TableHeader from "@/component/admin-dashboard/table-header";
import MainCard from "@/component/ui/card";
import { URLApplications } from "@/routes/router-link";
import ItemsCard from "../../component/dashboard/user-card";
import apiStatistics from "./../../assets/api-statistics/api-statistics.png";

const application = [
  { id: "total", icon: total, quantity: "3000", title: "Total" },
  { id: "pending", icon: pending, quantity: "150", title: "Pending" },
  {
    id: "email-verified",
    icon: emailVerified,
    quantity: "2000",
    title: "Email Verified",
  },
  { id: "completed", icon: completed, quantity: "850", title: "Completed" },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CompanyDashboard = () => {
  return (
    <div className="flex flex-col px-4 py-8 space-y-20">
      <div className="grid grid-cols-3 gap-6">
        <MainCard className="col-span-2">
          <h3 className="text-base mb-5">Applications</h3>

          <div className="flex items-center justify-between px-10 py-2">
            {application.map((item) => (
              <Link to={URLApplications()} key={item.id} id={item.id}>
                <ItemsCard {...item} />
              </Link>
            ))}
          </div>
        </MainCard>

        <MainCard className="col-span-1">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base">API Statistics</h3>

            <Select
              data={months}
              defaultValue={months[new Date().getMonth()]}
              styles={{ root: { width: "120px", height: "28px" } }}
            />
          </div>

          <div className="flex items-center justify-evenly py-5">
            <ItemsCard icon={apiStatistics} quantity={200} title={"Calls"} />
            <ItemsCard icon={apiStatistics} quantity={200} title={"Calls"} />
            <ItemsCard icon={apiStatistics} quantity={200} title={"Calls"} />
          </div>
        </MainCard>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Recent Application</h2>
          <Select
            data={["PAN"]}
            defaultValue={"PAN"}
            styles={{ root: { width: "120px", height: "28px" } }}
          />
        </div>

        <div className="mt-10">
          <TableHeader />
          <TableBody />
          <TableBody />
          <TableBody />
          <TableBody />
          <TableBody />
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
