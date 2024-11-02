import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, AlertTriangle, CheckCircle2, Info, Terminal, X } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border border-gray-200 p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-950 [&>svg~*]:pl-7 dark:border-gray-800 dark:text-gray-50",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-950 dark:bg-gray-950 dark:text-gray-50",
        destructive:
          "border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500",
        warning: "border-yellow-500/50 text-yellow-500 [&>svg]:text-yellow-500",
        success: "border-green-500/50 text-green-500 [&>svg]:text-green-500",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={alertVariants({ variant })}
    {...props}
  >
    {children}
  </div>
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h5
    ref={ref}
    className="mb-1 font-medium leading-none tracking-tight"
    {...props}
  >
    {children}
  </h5>
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className="text-sm [&_p]:leading-relaxed"
    {...props}
  >
    {children}
  </div>
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }