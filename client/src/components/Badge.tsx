import React from "react";

interface BadgeProps {
  children: string;
  className: string;
};

const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-primary/10 dark:bg-primary/80 font-light w-fit px-2 py-1 rounded-full text-primary dark:text-gray-100 text-sm ${className}`}
    >
      <p>
        {children}
      </p>
    </div>
  );
};

export default Badge;
