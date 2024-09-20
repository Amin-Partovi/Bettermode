import classNames from "classnames";
import { ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md";
}

const Avatar = ({ size = "sm", ...props }: Props) => {
  return (
    <img
      className={classNames(
        { "w-32 h-32": size === "md" },
        { "w-12 h-12": size === "sm" },
        "rounded-lg overflow-hidden border object-cover"
      )}
      {...props}
    />
  );
};

export default Avatar;
