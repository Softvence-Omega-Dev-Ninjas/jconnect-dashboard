import React from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  return (
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
        maxLength={10}
        className="grow p-3 bg-transparent text-black focus:outline-none"
      />
    </div>
  );
};

export default PhoneInput;
