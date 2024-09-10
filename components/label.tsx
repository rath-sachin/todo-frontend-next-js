import { ComponentProps } from "react";
import React from "react";

type LabelProps = ComponentProps<"label">;

// export function Button({ className, ...props }: ButtonProps) {
//   return (
//     <button className=" bg-blue-900 rounded text-white w-full" {...props} />
//   )
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return <label className="block" {...props} ref={ref} />;
  }
);

export { Label };
