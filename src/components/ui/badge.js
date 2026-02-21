import * as React from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Badge = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", className)} {...props} />
));
Badge.displayName = "Badge";

export { Badge };

