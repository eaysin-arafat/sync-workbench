import BackButtonIcon from "@/assets/user-info/BackButtonIcon";
import DisplayProfile from "@/component/profile-upload-display/display-profile";
import ProfileUploadButton from "@/component/profile-upload-display/profile-upload";
import FormInput from "@/component/ui/form-elements/input";
import PhoneNumberInput from "@/component/ui/form-elements/phone-number-input";

import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
  const navigate = useNavigate();

  return (
    <div className=" bg-[#FAFAFB] mt-12">
      <Button
        variant="outline"
        className="!border-black !text-black !font-bold"
        leftSection={<BackButtonIcon />}
        onClick={() => navigate(-1)}
      >
        Close
      </Button>

      <div className="my-16 mx-52 py-14 flex flex-col items-center space-y-16 bg-white">
        <div className="relative ">
          <DisplayProfile profileImage="" />

          <div className="absolute bottom-3 right-1.5">
            <ProfileUploadButton />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <FormInput
            label="First name"
            width="360px"
            placeholder="Type First Name"
            required
          />
          <FormInput
            label="Last name"
            width="360px"
            placeholder="Type First Name"
            required
          />
          <FormInput
            label="Email"
            width="360px"
            placeholder="Type First Name"
            required
          />
          <PhoneNumberInput
            value=""
            setValue={() => {}}
            label="Mobile number"
            required
          />
        </div>

        <Button variant="default" className="!bg-black !text-white !px-16">
          Add Now
        </Button>
      </div>
    </div>
  );
};

export default AddUsers;
