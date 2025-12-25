import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import PhoneInput from "./PhoneInput";
import { FormInputs } from "../types";

interface PhoneFieldProps {
  control: Control<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

const PhoneField: React.FC<PhoneFieldProps> = ({ control, errors }) => {
  return (
    <Controller
      name="phone"
      control={control}
      rules={{
        required: "Phone number is required",
        minLength: {
          value: 10,
          message: "Phone number must be 10 digits",
        },
        maxLength: {
          value: 10,
          message: "Phone number must be 10 digits",
        },
        pattern: {
          value: /^[0-9]{10}$/,
          message: "Phone number must contain only digits",
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
          <PhoneInput value={field.value} onChange={field.onChange} />
          {errors.phone && (
            <p className="text-red-500 mt-2 text-sm">{errors.phone.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default PhoneField;
