import React from "react";
import { RotateCw } from "lucide-react";

interface ResendButtonProps {
  timer: number;
  isResending: boolean;
  onResend: () => void;
}

const ResendButton: React.FC<ResendButtonProps> = ({ timer, isResending, onResend }) => {
  if (timer > 0) {
    return (
      <p className="text-gray-600 text-sm">
        Resend code in <span className="font-bold text-red-600">{timer}s</span>
      </p>
    );
  }

  return (
    <button
      onClick={onResend}
      disabled={isResending}
      className="text-red-600 font-semibold flex items-center justify-center mx-auto hover:text-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RotateCw className="w-4 h-4 mr-2" />
      {isResending ? "Sending..." : "Resend Code"}
    </button>
  );
};

export default ResendButton;
