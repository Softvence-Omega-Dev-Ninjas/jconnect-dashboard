import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Lock, RotateCw } from "lucide-react";
// import { useVerifyOtpMutation, useResendOtpMutation } from '@/redux/features/auth/authApi';

const OTP_LENGTH = 6;
const RESEND_TIMEOUT_SECONDS = 10;

interface LocationState {
  method: "email" | "phone";
  value: string;
}

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | undefined;
  const { method, value } = state || {
    method: "email",
    value: "example@domain.com",
  };

  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_TIMEOUT_SECONDS);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  // const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const isVerifying = false;
  const isResending = false;

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleOtpChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target.value;
    const newOtp = [...otp];

    if (input.match(/^[0-9]$/) || input === "") {
      newOtp[index] = input;
      setOtp(newOtp);
      setError(null);
    }

    if (input && index < OTP_LENGTH - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      // handleSubmitVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmitVerify = async () => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      setError("Please enter the complete 4-digit code.");
      return;
    }

    // try {
    //     await verifyOtp({ code, method, value }).unwrap();

    //     // সফল হলে, পাসওয়ার্ড রিসেট স্ক্রিনে নেভিগেট করুন
    //     navigate('/reset-password', { state: { code, method, value } });
    // } catch (err) {
    //     setError('Invalid or expired code. Please try again.');
    // }

    alert(`Verifying code: ${code}`);
    navigate("/reset-password", { state: { code, method, value } });
  };

  const handleResend = async () => {
    if (isResending || timer > 0) return;

    // try {
    //     await resendOtp({ method, value }).unwrap();
    setTimer(RESEND_TIMEOUT_SECONDS);
    setError(null);
    setOtp(new Array(OTP_LENGTH).fill("")); // OTP ইনপুট রিসেট করা
    // alert(`New code sent to ${value}`);
    // } catch (err) {
    //     setError('Failed to resend code.');
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg px-4 md:py-10 md:px-8 w-full max-w-lg border border-gray-200">
        <header className="flex items-center py-4">
          <button className="text-black" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
          <h1 className="text-xl font-bold text-black mx-auto transform -translate-x-3">
            Verify Code
          </h1>
        </header>

        <main className="grow flex flex-col justify-between">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg text-center space-y-4 border border-gray-100">
              <div className="w-16 h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg text-black font-medium">
                Enter the 4-digit code
              </p>
              <p className="text-sm text-gray-600">
                The code was sent to your{" "}
                {method === "email" ? "email" : "phone number"}:
                <span className="font-semibold text-black"> {value}</span>
              </p>
            </div>

            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center text-xl font-bold text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition-all"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 mt-4 text-center text-sm">{error}</p>
            )}

            <div className="text-center mt-6">
              {timer > 0 ? (
                <p className="text-gray-600 text-sm">
                  Resend code in{" "}
                  <span className="font-bold text-red-600">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-red-600 font-semibold flex items-center justify-center mx-auto hover:text-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  {isResending ? "Sending..." : "Resend Code"}
                </button>
              )}
            </div>
          </div>

          <div className="w-full pb-8 pt-8">
            <button
              type="button"
              onClick={handleSubmitVerify}
              disabled={isVerifying || otp.join("").length !== OTP_LENGTH}
              className={`w-full py-3 rounded text-white font-bold
         bg-[linear-gradient(135deg,#7A0012_0%,#FF1845_50%,#D41436_60%,#7A0012_100%)]
         shadow-[0_4px_12px_rgba(0,0,0,0.35)]
         hover:opacity-95 transition duration-200 cursor-pointer
                            ${
                              isVerifying ? "opacity-50 cursor-not-allowed" : ""
                            }`}
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VerifyOtp;
