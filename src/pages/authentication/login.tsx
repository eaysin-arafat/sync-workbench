import AuthLogo from "@/assets/AuthLogo";
import GoogleIcon from "@/assets/GoogleIcon";
import FormField from "@/component/form-field";
import Button from "@/component/ui/button";
import Checkbox from "@/component/ui/form-elements/checkbox";
import Typography from "@/component/ui/typography";
import { useLoginUserMutation } from "@/features/auth/auth-api";
import { getSignupLink } from "@/routes/router-link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as Yup from "yup";

type FormData = {
  username: string;
  password: string;
};

const initialState: FormData = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username name is required"),
  password: Yup.string().required("Password name is required"),
});

const Login = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema as any),
    defaultValues: initialState,
    mode: "onChange",
  });

  const [userLogin, { isError, error: loginError }] = useLoginUserMutation();

  // Preload stored credentials from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
      setValue("username", storedUsername);
      setValue("password", storedPassword);
      setRememberMe(true);
    }
  }, [setValue]);

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    try {
      if (rememberMe) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("password", data.password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }

      await userLogin({
        username: data?.username,
        password: data?.password,
      }).unwrap();

      reset();
    } catch (errorRes) {
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
              <div className="space-y-4">
                <FormField
                  formType="input"
                  label="Username"
                  control={control}
                  name="username"
                  error={errors?.username?.message}
                  required
                />

                <FormField
                  formType="password"
                  control={control}
                  label="Password"
                  name="password"
                  error={errors?.password?.message}
                  required
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

                <div className="flex items-center justify-between mb-2.5 mt-5">
                  <Checkbox
                    label="Remember me"
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />

                  <Typography variant="link">Forgot your password?</Typography>
                </div>

                <Button fullWidth type="submit" loading={isSubmitting}>
                  Sign In
                </Button>
              </div>

              <Button leftSection={<GoogleIcon />} variant="outline" fullWidth>
                Sign in with Google
              </Button>

              <div className="mt-6 text-center">
                <Typography
                  variant="p"
                  className="flex items-center justify-center gap-1"
                >
                  Don’t have any account?{" "}
                  <Typography variant="link">
                    <Link to={getSignupLink()} className="text-primary">
                      Sign Up
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

export default Login;
