import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { FormInputs } from "../types";

interface EmailFieldProps {
  control: Control<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

const EmailField: React.FC<EmailFieldProps> = ({ control, errors }) => {
  return (
    <Controller
      name="email"
      control={control}
      rules={{
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
            placeholder="Enter your email address"
            className="w-full p-3 bg-white border border-gray-300 text-black rounded-md focus:outline-none focus:border-red-600"
          />
          {errors.email && (
            <p className="text-red-500 mt-2 text-sm">{errors.email.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default EmailField;
