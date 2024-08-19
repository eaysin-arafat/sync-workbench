import Filter from "@/Component/Applications/Filter";
import UserProfile from "@/Component/Applications/UserProfile";

const Applications = () => {
  return (
    <div className="mt-8 bg-[#FAFAFB]">
      <Filter />

      <UserProfile data={Array.from({ length: 25 })} />
    </div>
  );
};

export default Applications;
