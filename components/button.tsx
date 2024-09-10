import { ComponentProps } from "react";
import React from "react";

type ButtonProps = ComponentProps<"button">;

// export function Button({ className, ...props }: ButtonProps) {
//   return (
//     <button className=" bg-blue-900 rounded text-white w-full" {...props} />
//   )
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className=" bg-blue-900 rounded text-white w-full"
        {...props}
        ref={ref}
      />
    );
  }
);

export { Button };
