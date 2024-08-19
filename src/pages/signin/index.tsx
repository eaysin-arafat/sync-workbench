import Button from "@/component/ui/button";
import Input from "@/component/ui/form-elements/input";
import PasswordInput from "@/component/ui/form-elements/password-input";
import { URLCompanySignup, URLDashboard } from "@/routes/router-link";
import { useState } from "react";
import { PiLockThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import CircleDesign from "./components/circle-design";
import RectangleDesign from "./components/rectangle-design";

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    navigate(URLDashboard());
  };

  return (
    <div className="flex flex-col md:flex-row h-screen gap-14">
      <div className="bg-black h-[40%] md:h-full md:w-[50%] relative">
        <RectangleDesign />

        <CircleDesign />
      </div>

      <div className=" bg-white h-[60%] md:h-full md:w-[50%] flex flex-col justify-center px-14 xl:px-44">
        <h2 className="text-3xl font-semibold">Sign In</h2>

        <form action="" className="" onSubmit={handleSignIn}>
          <div className="space-y-5 py-11">
            <Input
              label="User Name"
              placeholder="Enter user name"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Enter Password"
              height="45px"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button variant="primary" type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-gray-400 mt-5 text-xs">
          <p>
            Don't Have Account ?{" "}
            <Link to={URLCompanySignup()}>
              <span className="underline text-blue-600">Sign Up</span>
            </Link>{" "}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-400 mt-5 text-xs">
          <PiLockThin />
          <p>Your info is safely secured</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
