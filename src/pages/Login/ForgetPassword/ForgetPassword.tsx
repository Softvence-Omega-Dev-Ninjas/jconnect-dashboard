import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Lock } from "lucide-react";
// import { useSendPasswordResetCodeMutation } from '@/redux/features/auth/authApi';

type FormInputs = {
  email: string;
  phone: string;
};

const PhoneInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => (
  <div className="flex border border-gray-300 rounded-md overflow-hidden bg-white">
    <div className="flex items-center p-3 bg-gray-50 text-gray-700 border-r border-gray-300">
      <span className="mr-2">🇺🇸</span>
      <span>+1</span>
    </div>
    <input
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your phone number"
      className="grow p-3 bg-transparent text-black focus:outline-none"
    />
  </div>
);

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"email" | "phone">("email");

  // const [sendCode, { isLoading, error }] = useSendPasswordResetCodeMutation();

  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const payload =
      mode === "email"
        ? { method: "email", value: data.email }
        : { method: "phone", value: data.phone };

    try {
      // await sendCode(payload).unwrap();

      alert("Password reset code sent successfully!");
      navigate("/verify-otp", {
        state: { method: mode, value: payload.value },
      });
    } catch (err) {
      console.error("Failed to send reset code:", err);
    }
  };

  const handleModeChange = (newMode: "email" | "phone") => {
    setMode(newMode);
    if (newMode === "email") {
      setValue("phone", "");
      trigger("phone");
    } else {
      setValue("email", "");
      trigger("email");
    }
  };

  // const apiErrorMessage =
  // 	error && "data" in error
  // 		? (error.data as any).message
  // 		: "Failed to send reset code. Please try again.";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg py-10 px-4 md:py-24 md:px-12 w-full max-w-lg border border-gray-200">
        <header className="flex flex-col items-center py-4 space-y-6 mb-8">
          <h1 className="text-3xl font-bold text-black mx-auto transform -translate-x-3">
            Forgot Password
          </h1>
          <div className="bg-white p-6 rounded-lg text-center space-y-4 border border-gray-100">
            <div className="w-16 h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg text-black">
              Select which contact details should we use to reset your password
            </p>
          </div>
        </header>

        <main className="grow flex flex-col justify-between">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="space-y-6">
              <div className="flex justify-center mt-4">
                <div className="flex bg-gray-100 rounded-lg shadow-md">
                  <button
                    type="button"
                    onClick={() => handleModeChange("email")}
                    className={`
                px-4 py-3 text-sm font-semibold transition-all rounded-tl-lg rounded-bl-lg duration-300 w-24
                ${
                  mode === "email"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-700 bg-transparent hover:bg-red-50"
                }
            `}
                  >
                    Email
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeChange("phone")}
                    className={`
                px-4 py-3 text-sm font-semibold transition-all rounded-tr-lg rounded-br-lg duration-300 w-24
                ${
                  mode === "phone"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-700 bg-transparent hover:bg-red-50"
                }
            `}
                  >
                    Phone
                  </button>
                </div>
              </div>

              <div className="mt-8">
                {mode === "email" && (
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-gray-700 block text-sm font-medium"
                        >
                          Email Address
                        </label>
                        <input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="Enter your address"
                          className="w-full p-3 bg-white border border-gray-300 text-black rounded-md focus:outline-none focus:border-red-600"
                        />
                        {errors.email && (
                          <p className="text-red-500 mt-2 text-sm">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                )}

                {mode === "phone" && (
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      minLength: {
                        value: 8,
                        message: "Phone number is too short",
                      },
                    }}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-gray-700 block text-sm font-medium"
                        >
                          Phone Number
                        </label>
                        <PhoneInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                        {errors.phone && (
                          <p className="text-red-500 mt-2 text-sm">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                )}

                {/* API এরর মেসেজ */}
                {/* {error && (
								<p className="text-red-500 mt-4 text-sm text-center">
									{apiErrorMessage}
								</p>
							)} */}
              </div>
            </div>

            {/* কন্টিনিউ বাটন */}
            <div className="w-full pb-8 pt-8">
              <button
                type="submit"
                // disabled={isLoading}
                className="w-full py-3 rounded text-white font-bold
         bg-[linear-gradient(135deg,#7A0012_0%,#FF1845_50%,#D41436_60%,#7A0012_100%)]
         shadow-[0_4px_12px_rgba(0,0,0,0.35)]
         hover:opacity-95 transition duration-200 cursor-pointer disabled:opacity-50"
              >
                {/* {isLoading ? "Sending..." : "Continue"} */}
                Continue
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ForgotPassword;
