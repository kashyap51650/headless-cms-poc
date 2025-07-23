import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  icon,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
      <div className="flex items-center mb-6">
        {icon && <div className="text-primary-600 mr-3">{icon}</div>}
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      </div>
      {children}
    </div>
  );
};
