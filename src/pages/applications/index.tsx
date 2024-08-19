import Filter from "@/component/applications/Filter";
import UserProfile from "@/component/applications/UserProfile";

const Applications = () => {
  return (
    <div className="mt-8 bg-[#FAFAFB]">
      <Filter />

      <UserProfile data={Array.from({ length: 25 })} />
    </div>
  );
};

export default Applications;
