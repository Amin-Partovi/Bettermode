import classNames from "classnames";
import { LoaderIcon } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "filled";
  children: ReactNode;
  className?: string;
  isFluid?: boolean;
  iconLeft?: React.ReactElement | null;
  iconRight?: React.ReactElement | null;
  isLoading?: boolean;
}

const Button = ({
  variant = "outline",
  className,
  children,
  isFluid = false,
  iconLeft = null,
  iconRight = null,
  isLoading,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        "button text-sm",
        {
          "btn-filled": variant === "filled",
        },
        {
          "btn-outline": variant === "outline",
        },
        { "w-full": isFluid },
        className
      )}
      {...rest}
    >
      {isLoading && (
        <div
          className={classNames("btn-loading", {
            visible: isLoading,
            invisible: !isLoading,
          })}
          data-testid="loading-spinner"
        >
          <LoaderIcon className="animate-spin" width={20} height={20} />
        </div>
      )}

      <div className={classNames("btn-content ", { "opacity-0": isLoading })}>
        {iconLeft}
        {children && <div>{children}</div>}
        {iconRight}
      </div>
    </button>
  );
};

export default Button;
