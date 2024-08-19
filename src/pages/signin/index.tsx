import { fetchUserSignIn } from "@/redux/reducers/user-slicer";
import { AppDispatch, RootState } from "@/redux/store";
import { PasswordInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { PiLockThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../Component/UI/FormElements/FormInput";
import {
  URLCompanySignup,
  URLDashboard,
  URLUserBGV,
} from "../../Routes/router-link";

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { signInData, role, isLoading, isError } = useSelector(
    (state: RootState) => state.userReducer
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInSuccess, setSignInSuccess] = useState(false);

  const handleSignIn = () => {
    const host = window.location.host;
    const subdomain = host.split(".")[0];
    const portalUrl = `${subdomain}.saciahub.com`;

    dispatch(fetchUserSignIn({ username, password, portalUrl }))
      .unwrap()
      .then((data) => {
        setSignInSuccess(true);
        notifications.show({
          color: "blue",
          title: "Success",
          message: "Login Successful",
          autoClose: 4000,
        });
        if (role === "user") {
          if (data?.data?.User_bgv) {
            navigate(URLDashboard());
          } else if (!data?.data?.User_bgv) {
            navigate(URLUserBGV());
          }
        } else if (role === "Admin") {
          navigate(URLDashboard());
        }
      })
      .catch((error) => {
        notifications.show({
          color: "red",
          title: "Error",
          message: error,
          autoClose: 4000,
        });
      });
  };

  useEffect(() => {
    if (signInSuccess) {
      if (role === "user") {
        if (signInData?.User_bgv) {
          navigate(URLDashboard());
        } else if (!signInData?.User_bgv) {
          navigate(URLUserBGV());
        }
      } else if (role === "Admin") {
        navigate(URLDashboard());
      }
    }
  }, [signInSuccess]);

  return (
    <div className="grid grid-cols-10 min-h-screen">
      <div className="bg-black col-span-4 relative">
        <div className="bg-black grid grid-cols-6 gap-5 absolute right-16 top-16 ">
          {Array.from({ length: 36 }).map((_, index) => (
            <div key={index} className="bg-white rounded-full w-1 h-1"></div>
          ))}
        </div>

        <div className="absolute left-10 bottom-10 h-32 w-32 border border-white rounded-full flex items-center justify-center">
          <div className="h-20 w-20 border border-white rounded-full "></div>
        </div>
      </div>

      <div className=" bg-white px-52 2xl:px-64 py-[15%] 2xl:py-[20%] flex flex-col col-span-6">
        <h2 className="text-3xl font-semibold">Sign In</h2>

        <div className="space-y-5 py-11">
          <FormInput
            label="User Name"
            placeholder="Enter user name"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Enter Password"
            styles={{ input: { height: "45px" } }}
            onChange={(e) => setPassword(e.target.value)}
            withAsterisk
          />
        </div>

        <button
          onClick={handleSignIn}
          className="bg-black px-40 rounded-md text-white py-3 text-center"
          disabled={username === "" || password === ""}
        >
          Sign In{" "}
        </button>
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
