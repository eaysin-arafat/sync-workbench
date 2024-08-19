import { getPortalInfo } from "@/utils/get-protal-info";
import { Button, PasswordInput, Switch } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";
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
