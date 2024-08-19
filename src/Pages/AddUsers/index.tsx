import BackButtonIcon from "@/Assets/user-info/BackButtonIcon";
import FormInput from "@/Component/UI/FormElements/FormInput";
import PhoneNumberInput from "@/Component/UI/FormElements/PhoneNumberInput";
import ProfileUploadButton from "@/Component/UI/ProfileUploadAndDisplay/ProfileUpload";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import DisplayProfile from "../../Component/Account/EditProfile/DisplayProfile";

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
