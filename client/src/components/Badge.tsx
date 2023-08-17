import React from "react";

interface BadgeProps {
  children: string;
  className: string;
};

const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-primary/10 font-light w-fit px-2 py-1 rounded-full text-primary text-sm ${className}`}
    >
      <p>
        {children}
      </p>
    </div>
  );
};

export default Badge;
