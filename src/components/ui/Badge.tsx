import React from "react";
import clsx from "clsx";

export type BadgeVariant =
  | "blue"
  | "gray"
  | "red"
  | "green"
  | "yellow"
  | "indigo"
  | "purple"
  | "pink"
  | "orange";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const colorClasses: Record<BadgeVariant, string> = {
  blue: "bg-blue-100 text-blue-800 border border-blue-400",
  gray: "bg-gray-100 text-gray-800 border border-gray-400",
  red: "bg-red-100 text-red-800 border border-red-400",
  green: "bg-green-100 text-green-800 border border-green-400",
  yellow: "bg-yellow-100 text-yellow-800 border border-yellow-400",
  indigo: "bg-indigo-100 text-indigo-800 border border-indigo-400",
  purple: "bg-purple-100 text-purple-800 border border-purple-400",
  pink: "bg-pink-100 text-pink-800 border border-pink-400",
  orange: "bg-orange-100 text-orange-800 border border-orange-400",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "gray",
  className,
}) => {
  return (
    <span
      className={clsx(
        "text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg",
        colorClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
