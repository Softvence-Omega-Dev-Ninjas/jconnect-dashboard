import React from "react";

interface ModeToggleProps {
  mode: "email" | "phone";
  onModeChange: (mode: "email" | "phone") => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onModeChange }) => {
  const buttonClass = (isActive: boolean) =>
    `px-4 py-4 text-sm font-semibold transition-all duration-300 w-24 ${
      isActive
        ? "bg-red-600 text-white shadow-md"
        : "text-gray-700 bg-transparent hover:bg-red-50"
    }`;

  return (
    <div className="flex justify-center mt-4">
      <div className="flex bg-gray-100 rounded-lg shadow-md">
        <button
          type="button"
          onClick={() => onModeChange("email")}
          className={`${buttonClass(mode === "email")} rounded-tl-lg rounded-bl-lg`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => onModeChange("phone")}
          className={`${buttonClass(mode === "phone")} rounded-tr-lg rounded-br-lg`}
        >
          Phone
        </button>
      </div>
    </div>
  );
};

export default ModeToggle;
