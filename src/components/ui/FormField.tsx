import React from "react";
import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  children: React.ReactNode;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  htmlFor?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  error,
  required = false,
  className = "",
  htmlFor,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};
