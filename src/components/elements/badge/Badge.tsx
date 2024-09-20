import { ReactNode } from "react";

const Badge = ({ children }: { children: ReactNode }) => {
  return <div className="rounded-lg bg-gray-300 px-3 py-1">{children}</div>;
};

export default Badge;
