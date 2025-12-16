import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Lock, AlertCircle } from "lucide-react";

import {
  useResetPasswordMutation,
  ResetPasswordPayload,
} from "@/redux/features/auth/authApi";
import ApiErrorMessage from "@/components/Shared/ApiErrorMessage/ApiErrorMessage";

interface LocationState {
  code: string;
  method: "email" | "phone";
  value: string;
  resetToken: string;
}

type FormInputs = Pick<ResetPasswordPayload, "newPassword" | "confirmPassword">;

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!state?.resetToken) {
      navigate("/forgot-password", { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  const { resetToken } = state;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const payload: ResetPasswordPayload = {
      resetToken,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    try {
      await resetPassword(payload).unwrap();

      alert("Your password has been successfully reset! Please login.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Password reset failed:", err);
    }
  };

  const newPasswordValue = watch("newPassword");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg px-4 md:py-10 md:px-8 w-full max-w-lg border border-gray-200">
        <header className="flex flex-col items-center py-4 space-y-4 mb-8">
          <div className="w-16 h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-black text-center">
            Reset Your Password
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Set your new password below.
          </p>
        </header>

        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <Controller
                name="newPassword"
                control={control}
                rules={{
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label
                      htmlFor="newPassword"
                      className="text-gray-700 block text-sm font-medium"
                    >
                      New Password
                    </label>
                    <input
                      {...field}
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      className="w-full p-3 bg-white border border-gray-300 text-black rounded-md focus:outline-none focus:border-red-600"
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 mt-2 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === newPasswordValue || "Passwords do not match",
                }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-gray-700 block text-sm font-medium"
                    >
                      Confirm New Password
                    </label>
                    <input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full p-3 bg-white border border-gray-300 text-black rounded-md focus:outline-none focus:border-red-600"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 mt-2 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <ApiErrorMessage
                error={error}
                fallbackMessage="Failed to reset password. Please try again."
                className="text-red-500 mt-4 text-sm text-center"
              />
            </div>

            <div className="w-full pb-8 pt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded text-white font-bold
                  bg-[linear-gradient(135deg,#7A0012_0%,#FF1845_50%,#D41436_60%,#7A0012_100%)]
                  shadow-[0_4px_12px_rgba(0,0,0,0.35)]
                  hover:opacity-95 transition duration-200 disabled:opacity-50"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ResetPassword;
