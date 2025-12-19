interface ResendButtonProps {
  timer: number;
  isResending: boolean;
  onResend: () => void;
}

const ResendButton: React.FC<ResendButtonProps> = ({ timer, isResending, onResend }) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const timeDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="text-sm">
      {timer > 0 ? (
        <p className="text-gray-500">
          Resend code in <span className="font-bold text-red-600">{timeDisplay}</span>
        </p>
      ) : (
        <button
          onClick={onResend}
          disabled={isResending}
          className="text-red-600 font-bold hover:underline disabled:opacity-50"
        >
          {isResending ? "Sending..." : "Resend Code"}
        </button>
      )}
    </div>
  );
};

export default ResendButton;