import { ReactNode } from "react";

const Badge = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-lg bg-gray-200 px-3 py-1 w-fit">{children}</div>
  );
};

export default Badge;
