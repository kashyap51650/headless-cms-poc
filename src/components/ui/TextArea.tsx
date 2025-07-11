import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  error = false,
  className = "",
  ...props
}) => {
  const baseClasses = `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${
    error ? "border-red-300" : "border-slate-300"
  }`;

  return <textarea className={`${baseClasses} ${className}`} {...props} />;
};
