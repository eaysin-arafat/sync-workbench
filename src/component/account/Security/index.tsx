import { updatePassword } from "@/redux/reducers/user-slicer";
import { AppDispatch } from "@/redux/store";
import { getPortalInfo } from "@/utils/get-protal-info";
import { Button, PasswordInput, Switch } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { validateForm } from "./validation-form";

export interface FormState {
  currentPassword: string;
  newPassword: string;
}

const initialState = {
  currentPassword: "",
  newPassword: "",
};

const Security = () => {
  const dispatch: AppDispatch = useDispatch();
  const [formState, setFormState] = useState<FormState>({ ...initialState });
  const [errors, setErrors] = useState<FormState>({ ...initialState });

  const { portalUrl } = getPortalInfo();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { isValid, errors } = validateForm(formState);
    setErrors(errors);

    if (!isValid) {
      return;
    }

    dispatch(
      updatePassword({
        Company_Portal_Url: portalUrl,
        old_password: formState.currentPassword,
        new_password: formState.newPassword,
      })
    )
      .unwrap()
      .then((data) => {
        if (data.status === 200) {
          notifications.show({
            color: "blue",
            title: "Success",
            message: "Password updated successfully",
            autoClose: 4000,
          });
          setFormState({ ...initialState });
        } else {
          console.error("Login failed:", data);
        }
      })
      .catch((error) => {
        notifications.show({
          color: "red",
          title: "Error",
          message: typeof error === "string" ? error : "Something went wrong",
          autoClose: 4000,
        });
      });
  };

  return (
    <>
      <div className="flex gap-8">
        <div className="space-y-5">
          <h1 className="text-xl font-medium">Two-factor Authentication</h1>

          <div className="flex items-start gap-2">
            <Switch
              label="Enable or disable two factor authentication"
              size="md"
              color="#16DB2A"
              className="!cursor-pointer"
              defaultChecked={true}
            />
          </div>

          <div className="py-5 space-y-5 w-[580px]">
            <h1 className="text-xl font-medium">Change Password</h1>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-5">
                <PasswordInput
                  name="currentPassword"
                  label="Current Password"
                  placeholder="xxxxxxxxxxxxxxx"
                  styles={{ input: { height: "45px" } }}
                  value={formState.currentPassword}
                  onChange={handleChange}
                  error={errors.currentPassword}
                />

                <PasswordInput
                  name="newPassword"
                  label="New Password"
                  placeholder="xxxxxxxxxxxxxxx"
                  styles={{ input: { height: "45px" } }}
                  value={formState.newPassword}
                  onChange={handleChange}
                  error={errors.newPassword}
                />
              </div>

              <div className="flex gap-5 mt-5">
                <Button
                  variant="outline"
                  className="!border-black !text-black !font-bold"
                >
                  Close
                </Button>
                <Button color="black" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;
