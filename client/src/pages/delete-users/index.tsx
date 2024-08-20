import DeleteUserProfile from "@/component/delete-users/delete-user-profile";
import { URLAddUsers } from "@/routes/router-link";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const DeleteUsers = () => {
  return (
    <div className="mt-8 bg-[#FAFAFB]">
      <div className="w-full flex justify-end">
        <Link to={URLAddUsers()}>
          <Button variant="default" className="!bg-black !text-white">
            Add Account
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-4 items-center justify-evenly gap-10 py-10 w-full">
        {Array.from({ length: 4 }).map(() => (
          <DeleteUserProfile />
        ))}
      </div>
    </div>
  );
};

export default DeleteUsers;
