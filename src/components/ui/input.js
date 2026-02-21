import * as React from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input ref={ref} type={type} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm", className)} {...props} />
));
Input.displayName = "Input";

export { Input };

