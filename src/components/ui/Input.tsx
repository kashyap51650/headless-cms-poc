import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  error = false,
  icon,
  className = "",
  ...props
}) => {
  const baseClasses = `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
    error ? "border-red-300" : "border-slate-300"
  }`;

  const iconClasses = icon ? "pl-11" : "";

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-3.5 w-5 h-5 text-slate-400">
          {icon}
        </div>
      )}
      <input
        className={`${baseClasses} ${iconClasses} ${className}`}
        {...props}
      />
    </div>
  );
};
