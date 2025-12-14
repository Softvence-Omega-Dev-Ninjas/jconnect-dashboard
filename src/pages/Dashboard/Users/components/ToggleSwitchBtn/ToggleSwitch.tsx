import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ checked, onChange, disabled }) => {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
        checked ? (disabled ? "bg-gray-300" : "bg-green-500") : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></span>
    </button>
  );
};

export default ToggleSwitch;
