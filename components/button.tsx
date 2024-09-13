import { ComponentProps } from "react";
import React from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "destructive";
};

// export function Button({ className, ...props }: ButtonProps) {
//   return (
//     <button className=" bg-blue-900 rounded text-white w-full" {...props} />
//   )
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    var classes = "";
    if (variant == "default") {
      classes += " bg-blue-500";
    } else {
      classes += " bg-red-500";
    }
    return (
      <button
        className={`${classes} text-white text-lg font-semibold rounded-lg p-1`}
        {...props}
        ref={ref}
      />
    );
  }
);

export { Button };
