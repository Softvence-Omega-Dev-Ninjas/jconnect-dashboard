import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import OtpInput from "./components/OtpInput";
import ResendButton from "./components/ResendButton";
import { useTimer } from "./hooks/useTimer";
import { LocationState } from "./types";
import { OTP_LENGTH, RESEND_TIMEOUT_SECONDS } from "./constants";

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const { timer, resetTimer } = useTimer(RESEND_TIMEOUT_SECONDS);

  const isVerifying = false;
  const isResending = false;

  useEffect(() => {
    if (!state?.method || !state?.value || !state?.resetToken) {
      navigate("/forgot-password", { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  const { method, value, resetToken } = state;

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      setError(`Please enter the complete ${OTP_LENGTH}-digit code.`);
      return;
    }

    try {
      // await verifyOtp({ code, method, value, resetToken }).unwrap();
      navigate("/reset-password", {
        state: { code, method, value, resetToken },
      });
    } catch (err) {
      console.log(err);
      setError("Invalid or expired code. Please try again.");
    }
  };

  const handleResend = async () => {
    if (isResending || timer > 0) return;

    try {
      // await resendOtp({ method, value }).unwrap();
      resetTimer();
      setError(null);
      setOtp(Array(OTP_LENGTH).fill(""));
    } catch (err) {
      console.log(err);
      setError("Failed to resend code.");
    }
  };

  const handleOtpChange = (newOtp: string[]) => {
    setOtp(newOtp);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg px-4 md:py-10 md:px-8 w-full max-w-lg border border-gray-200">
        <PageHeader onBack={() => navigate(-1)} method={method} value={value} />

        <main>
          <div className="space-y-8">
            <OtpInput otp={otp} onChange={handleOtpChange} />

            {error && (
              <p className="text-red-500 mt-4 text-center text-sm">{error}</p>
            )}

            <div className="text-center mt-6">
              <ResendButton
                timer={timer}
                isResending={isResending}
                onResend={handleResend}
              />
            </div>
          </div>

          <div className="w-full pb-8 pt-8">
            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying || otp.join("").length !== OTP_LENGTH}
              className="w-full py-3 rounded text-white font-bold
                bg-[linear-gradient(135deg,#7A0012_0%,#FF1845_50%,#D41436_60%,#7A0012_100%)]
                shadow-[0_4px_12px_rgba(0,0,0,0.35)]
                hover:opacity-95 transition duration-200 disabled:opacity-50"
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
