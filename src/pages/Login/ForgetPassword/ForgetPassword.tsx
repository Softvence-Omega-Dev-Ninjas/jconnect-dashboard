import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import ApiErrorMessage from "@/components/Shared/ApiErrorMessage/ApiErrorMessage";
import PageHeader from "./components/PageHeader";
import ModeToggle from "./components/ModeToggle";
import EmailField from "./components/EmailField";
import PhoneField from "./components/PhoneField";
import { ContactMethod, FormInputs } from "./types";
import {
  useSendPasswordResetCodeEmailMutation,
  useSendPasswordResetCodePhoneMutation,
} from "@/redux/features/auth/authApi";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<ContactMethod>("email");

  const [sendEmailCode, { isLoading: isEmailLoading, error: emailError }] =
    useSendPasswordResetCodeEmailMutation();

  const [sendPhoneCode, { isLoading: isPhoneLoading, error: phoneError }] =
    useSendPasswordResetCodePhoneMutation();

  const isLoading = isEmailLoading || isPhoneLoading;
  const currentError = mode === "email" ? emailError : phoneError;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: { email: "", phone: "" },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (mode === "email") {
      try {
        const result = await sendEmailCode({
          email: data.email,
        }).unwrap();

        navigate("/verify-otp", {
          state: {
            method: mode,
            value: data.email,
            resetToken: result.data.resetToken,
          },
        });
      } catch (err) {
        console.error("Failed to send reset code (Email):", err);
      }
    } else if (mode === "phone") {
      try {
        const result = await sendPhoneCode({ phone: data.phone }).unwrap();

        navigate("/verify-otp", {
          state: {
            method: mode,
            value: data.phone,
            resetToken: result.data.resetToken,
          },
        });
      } catch (err) {
        console.error("Failed to send reset code (Phone):", err);
      }
    }
  };

  const handleModeChange = (newMode: ContactMethod) => {
    setMode(newMode);
    setValue(newMode === "email" ? "phone" : "email", "");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg px-4 md:py-10 md:px-8 w-full max-w-lg border border-gray-200">
        <PageHeader onBack={() => navigate(-1)} />

        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <ModeToggle mode={mode} onModeChange={handleModeChange} />

              <div className="mt-8">
                {mode === "email" ? (
                  <EmailField control={control} errors={errors} />
                ) : (
                  <PhoneField control={control} errors={errors} />
                )}

                <ApiErrorMessage
                  error={currentError}
                  fallbackMessage="Failed to send reset code. Please try again."
                  className="text-red-500 mt-4 text-sm text-center"
                />
              </div>
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
                {isLoading ? "Sending..." : "Continue"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ForgotPassword;
