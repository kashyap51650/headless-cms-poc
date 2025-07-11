import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl disabled:bg-slate-300 disabled:text-slate-500",
    secondary:
      "bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500",
    outline:
      "border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-3 text-lg",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${
        sizes[size]
      } ${className} ${isDisabled ? "cursor-not-allowed" : ""}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Loading...
        </>
      ) : (
        <>
          {icon && <div className="mr-2">{icon}</div>}
          {children}
        </>
      )}
    </button>
  );
};
