import { MdAccountCircle } from "react-icons/md";

const DisplayProfile = ({ profileImage }: { profileImage: string }) => {
  return (
    <>
      {profileImage ? (
        <div className="h-[108px] w-[105px]">
          <img
            src={profileImage}
            alt=""
            className="rounded-full object-cover h-[100px] w-[100px]"
          />
        </div>
      ) : (
        <div className="rounded-full h-[100px] w-[100px]">
          <MdAccountCircle className="h-full w-full" />
        </div>
      )}
    </>
  );
};

export default DisplayProfile;
