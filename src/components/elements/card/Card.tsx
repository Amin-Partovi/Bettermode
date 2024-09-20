import classNames from "classnames";
import { ReactNode } from "react";

const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={classNames("p-6 shadow-md rounded-lg bg-white", className)}>
      {children}
    </div>
  );
};

export default Card;
