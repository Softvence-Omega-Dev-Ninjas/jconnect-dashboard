import React from "react";

interface ApiErrorData {
  message: string;
}

interface ApiError {
  data: ApiErrorData;
  status: number;
}

function isApiError(error: any): error is ApiError {
  if (typeof error !== "object" || error === null || !("data" in error)) {
    return false;
  }
  const data = (error as any).data;
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  );
}

interface ApiErrorMessageProps {
  error?: any;
  fallbackMessage?: string;
  className?: string;
}

const ApiErrorMessage: React.FC<ApiErrorMessageProps> = ({
  error,
  fallbackMessage,
  className = "text-red-500 mt-2 text-center text-sm",
}) => {
  let displayMessage: string;

  if (!error) {
    return null;
  }

  if (isApiError(error)) {
    displayMessage = error.data.message;
  } else if ("message" in error && typeof error.message === "string") {
    displayMessage = error.message;
  } else {
    displayMessage =
      fallbackMessage || "An unknown error occurred. Please try again.";
  }

  return <p className={className}>{displayMessage}</p>;
};

export default ApiErrorMessage;
