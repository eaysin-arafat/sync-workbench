import AuthLogo from "@/assets/AuthLogo";
import FormField from "@/component/form-field";
import Button from "@/component/ui/button";
import Typography from "@/component/ui/typography";
import { useRegistrationUserMutation } from "@/features/auth/auth-api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as Yup from "yup";

interface FormData {
  username: string;
  email: string;
  phone: string;
  confirmed: boolean;
  first_name: string;
  last_name: string;
  date_of_birth: Date | null;
  password: string;
  re_enter_password: string;
}

const initialState: FormData = {
  username: "",
  email: "",
  phone: "",
  confirmed: false,
  date_of_birth: null,
  first_name: "",
  last_name: "",
  password: "",
  re_enter_password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^\+880[1-9][0-9]{8,9}$/,
      "Phone number must start with +880 and be followed by 9 or 10 digits"
    )
    .required("Phone number is required"),
  confirmed: Yup.boolean().oneOf(
    [true],
    "You must accept the Terms and Conditions"
  ),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  date_of_birth: Yup.date()
    .nullable()
    .max(new Date(), "Date of birth cannot be in the future")
    .typeError("Invalid date"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  re_enter_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Re-entering password is required"),
});

const Register = () => {
  const [error, setError] = useState<string | null>("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema as any),
    defaultValues: initialState,
    mode: "onChange",
  });

  const [registration, { isError, error: loginError }] =
    useRegistrationUserMutation();

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    try {
      await registration(data).unwrap();

      reset();
    } catch (error) {
      reset(undefined, { keepValues: true });
    }
  };

  useEffect(() => {
    if (isError && loginError) {
      const errorMessage = "An error occurred. Please try again.";
      setError(errorMessage);
    }
  }, [isError, loginError]);

  return (
    <>
      <div className="grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center items-center border-r border-stroke">
          <Link className="mb-1 text-start w-[60%]" to="/">
            <Typography variant="h2">Sync-WorkBench</Typography>
          </Link>

          <Typography
            variant="p"
            className="text-start text-textGray w-[60%] font-light"
          >
            A comprehensive HRMS should provide features for employee
            management, performance tracking, time and attendance, payroll,
            communication, and compliance.
          </Typography>

          <span className="mt-15 inline-block">
            <AuthLogo />
          </span>
        </div>

        <div className="rounded-sm bg-white h-screen flex items-center justify-center">
          <div className="w-full md:w-[80%] p-12 sm:p-12.5 md:p-30 lg:p-5">
            {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
            <Typography variant="h3" className="mb-3">
              Sign In to Sync-Workbench
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4">
                <FormField
                  formType="input"
                  control={control}
                  label="Username"
                  name="username"
                  placeholder="Enter your full name"
                  error={errors?.username?.message}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    formType="input"
                    control={control}
                    label="First Name"
                    name="first_name"
                    placeholder="Enter your first name"
                    error={errors?.first_name?.message}
                    required
                  />
                  <FormField
                    formType="input"
                    control={control}
                    name="last_name"
                    label="Last Name"
                    placeholder="Enter your last name"
                    error={errors?.last_name?.message}
                    required
                  />
                </div>
                <FormField
                  formType="input"
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Enter your full name"
                  error={errors?.email?.message}
                  required
                />
                <FormField
                  formType="input"
                  control={control}
                  name="phone"
                  label="Phone Number"
                  error={errors?.phone?.message}
                  required
                />

                <FormField
                  formType="date"
                  control={control}
                  name="date_of_birth"
                  label="Date of Birth"
                  placeholder="Enter Date of Birth"
                  error={errors?.date_of_birth?.message}
                />
                <FormField
                  formType="password"
                  control={control}
                  label="Password"
                  name="password"
                  placeholder="Enter Your Password"
                  error={errors?.password?.message}
                  required
                />
                <FormField
                  formType="password"
                  control={control}
                  label="Re-Enter Password"
                  name="re_enter_password"
                  placeholder="Re-Enter Your Password"
                  error={errors?.re_enter_password?.message}
                  required
                />
                <FormField
                  formType="checkbox"
                  control={control}
                  name="confirmed"
                  label="I accept the Terms and Conditions"
                  error={errors?.confirmed?.message}
                />
              </div>

              <div className="mb-5">
                {error && (
                  <div
                    role="alert"
                    className={
                      "alert flex items-center justify-between gap-1 text-danger rounded-sm px-1 mb-2"
                    }
                  >
                    <div className="text-sm font-medium flex gap-1 items-center">
                      {error}
                    </div>

                    <button type="button" onClick={() => setError("")}>
                      <FaTimes size={12} />
                    </button>
                  </div>
                )}

                <Button fullWidth type="submit" loading={isSubmitting}>
                  Sign In
                </Button>
              </div>

              <div className="mt-6 text-center">
                <Typography
                  variant="p"
                  className="flex items-center justify-center gap-1"
                >
                  Have any account?{" "}
                  <Typography variant="link">
                    <Link to={"/"} className="text-primary">
                      Sign In
                    </Link>
                  </Typography>
                </Typography>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
