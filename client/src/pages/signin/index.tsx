import Button from "@/component/ui/button";
import Input from "@/component/ui/form-elements/input";
import PasswordInput from "@/component/ui/form-elements/password-input";
import { useLoginUserMutation } from "@/features/auth/auth-api";
import { URLUserSignup } from "@/routes/router-link";
import { styles } from "@/utils/cn";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { PiLockThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import CircleDesign from "./components/circle-design";
import RectangleDesign from "./components/rectangle-design";

type FormDataType = {
  username: string;
  password: string;
};

const initialState: FormDataType = {
  username: "",
  password: "",
};

const SignIn = () => {
  const [formData, setFormData] = useState<FormDataType>({ ...initialState });
  const [error, setError] = useState<string | null>("");

  const [userLogin, { isError, error: loginError, status }] =
    useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) setError(null);
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    userLogin({ identifier: formData.username, password: formData.password });
  };

  useEffect(() => {
    if (isError && loginError) {
      const errorMessage = "An error occurred. Please try again.";
      setError(errorMessage);
    }
  }, [isError, loginError]);

  return (
    <div className="flex flex-col md:flex-row h-screen gap-14">
      <div className="bg-black h-[40%] md:h-full md:w-[50%] relative">
        <RectangleDesign />

        <CircleDesign />
      </div>

      <div className=" bg-white h-[60%] md:h-full md:w-[50%] flex flex-col justify-center px-14 xl:px-44">
        <h2 className="text-3xl font-semibold">Sign In</h2>

        <form action="" className="" onSubmit={handleSignIn}>
          <div className="space-y-3 pt-11 pb-5">
            <Input
              label="User Name"
              name="username"
              value={formData.username}
              placeholder="Enter user name"
              onChange={handleChange}
              required
            />

            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              height="45px"
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="grid gap-4 2xl:gap-6">
              <div
                role="alert"
                className={styles(
                  "alert flex items-center justify-between text-dangerColor gap-1 text-red-600 rounded-sm px-2.5 mb-2"
                )}
              >
                <div className="text-[10px] font-medium flex gap-1 items-center">
                  {error}
                </div>
                <button type="button" onClick={() => setError("")} className="">
                  <FaTimes size={12} />
                </button>
              </div>
            </div>
          )}

          <Button variant="primary" type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-gray-400 mt-5 text-xs">
          <p>
            Don't Have Account?{" "}
            <Link to={URLUserSignup()}>
              <span className="underline text-blue-600">Sign Up</span>
            </Link>{" "}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-400 mt-3 text-xs">
          <PiLockThin />
          <p>Your info is safely secured</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
