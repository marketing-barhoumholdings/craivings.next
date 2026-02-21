import * as React from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Button = React.forwardRef(({ className, type = "button", ...props }, ref) => {
  return (
    <button ref={ref} type={type} className={cn("inline-flex items-center justify-center", className)} {...props} />
  );
});
Button.displayName = "Button";

export { Button };

