import SignInBg from "@/component/signin/signin-bg";
import Input from "@/component/ui/form-elements/input";
import PhoneNumberInput from "@/component/ui/form-elements/phone-number-input";
import { Checkbox, PasswordInput } from "@mantine/core";
import { PiLockThin } from "react-icons/pi";

const UserSignUp = () => {
  return (
    <div className="min-h-screen relative">
      <div className="px-[calc(100vh-25%)] py-20 2xl:py-40">
        <h1 className="text-3xl mb-8 font-semibold">Sign Up</h1>

        <div className="grid grid-cols-2 items-center gap-x-7 gap-y-7">
          <Input label="FIrst Name" placeholder="Enter first name" required />
          <Input label="Last Name" placeholder="Enter last name" required />
          <Input
            label="Email Address"
            placeholder="Enter email address"
            required
          />
          <PhoneNumberInput
            value=""
            setValue={() => {}}
            label="Mobile Number"
            required
          />

          <PasswordInput
            label="Create Password"
            placeholder="Enter password"
            styles={{ input: { height: "40px" } }}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter Password"
            styles={{ input: { height: "40px" } }}
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full mt-10">
          <div className="flex flex-col justify-start space-y-5">
            <Checkbox label="I agree to terms & conditions" color="black" />
            <button className="bg-black px-40 rounded-md text-white py-3">
              Create Account{" "}
            </button>
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

export default UserSignUp;
