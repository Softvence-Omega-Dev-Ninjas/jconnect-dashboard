import React from "react";

type StatusKey = string;

interface StatusColorMap {
  [key: StatusKey]: string;
}

interface StatusBadgeProps {
  status: StatusKey;
  colorMap: StatusColorMap;
  fallbackColor: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  colorMap,
  fallbackColor,
}) => {
  const statusKey = status.toUpperCase();
  const statusClass = colorMap[statusKey] || fallbackColor;

  return (
    <span
      className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${statusClass}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
