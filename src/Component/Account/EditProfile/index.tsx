import FormInput from "@/Component/UI/FormElements/FormInput";
import ProfileUploadButton from "@/Component/UI/ProfileUploadAndDisplay/ProfileUpload";
import { PasswordInput } from "@mantine/core";
import DisplayProfile from "./DisplayProfile";

const EditProfile = ({ signInData }: { signInData: any }) => {
  return (
    <>
      <form
        className="flex gap-8"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <div className="relative ">
            <DisplayProfile profileImage="" />

            <div className="absolute bottom-3 right-1.5">
              <ProfileUploadButton />
            </div>
          </div>
        </div>

        <div>
          <div className="px-5 py-5 space-y-5 w-[800px]">
            <div className="grid grid-cols-2 gap-5">
              <FormInput
                label="First Name"
                value={signInData?.FirstName}
                readOnly
                disabled
              />
              <FormInput
                label="Last Name"
                value={signInData?.LastName}
                readOnly
                disabled
              />
              <FormInput
                label="Email"
                value={signInData?.Email}
                readOnly
                disabled
              />
              <FormInput
                label="Role"
                value={signInData?.Role}
                readOnly
                disabled
              />

              <PasswordInput
                label="Password"
                placeholder="xxxxxxxxxxxxxxx"
                value={signInData?.password}
                readOnly
                styles={{
                  root: { pointerEvents: "none" },
                  input: { height: "45px" },
                  innerInput: {
                    opacity: "0.7",
                    backgroundColor: "#f1f3f5",
                    color: "#868e96",
                    cursor: "not-allowed",
                  },
                }}
              />
            </div>

            {/* <div className="flex gap-5">
              <Button
                variant="outline"
                className="!border-black !text-black !font-bold"
              >
                Close
              </Button>

              <Button variant="default" bg={"black"} className="!text-white">
                Submit
              </Button>
            </div> */}
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
