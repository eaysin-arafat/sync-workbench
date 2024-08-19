import SignInBg from "@/component/signin/signin-bg";
import FormInput from "@/component/ui/form-elements/input";
import PhoneNumberInput from "@/component/ui/form-elements/phone-number-input";
import { URLSignIn } from "@/routes/router-link";
import { Checkbox } from "@mantine/core";
import { PiLockThin } from "react-icons/pi";
import { Link } from "react-router-dom";

const CompanySignUp = () => {
  return (
    <div className="bg-white min-h-screen relative">
      <div className="px-[calc(100vh-25%)] py-24">
        <h1 className="text-3xl mb-8 font-semibold">Sign Up</h1>

        <div className="grid grid-cols-2 items-center gap-x-7 gap-y-5">
          <FormInput label="Company Name" required />
          <FormInput label="Company Short Name" required />
          <FormInput label="Contract First Name" required />
          <FormInput label="Contract Last Name" required />
          <FormInput label="Email Address" required />
          <PhoneNumberInput
            value=""
            setValue={() => {}}
            label="Mobile Number"
            required
          />
          <FormInput label="Address" required />
        </div>

        <div className="flex flex-col items-center justify-center w-full mt-16">
          <div className="flex flex-col justify-start space-y-5">
            <Checkbox label="I agree to terms & conditions" color="black" />
            <Link
              to={URLSignIn()}
              className="bg-black px-40 rounded-md text-white py-3"
            >
              Sign Up{" "}
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-400 mt-5 text-xs">
            <p>
              Already Have an Account ?{" "}
              <Link to={URLSignIn()}>
                <span className="underline text-blue-600">Sign In</span>
              </Link>{" "}
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-400 mt-5 text-xs">
            <PiLockThin />
            <p>Your info is safely secured</p>
          </div>
        </div>
      </div>
      <SignInBg />
    </div>
  );
};

export default CompanySignUp;
