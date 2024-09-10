import { ComponentProps } from "react";
import React from "react";

type InputProps = ComponentProps<"input">;

// export function Input({ className, ...props }: InputProps) {
//   return <input className="text-black rounded" {...props} />;
// }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input className="text-black rounded bg-slate-200" {...props} ref={ref} />
    );
  }
);
export { Input };
