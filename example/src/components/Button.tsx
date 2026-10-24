import type { ButtonHTMLAttributes } from 'react';
import { cn } from 'cn';

type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-accent-blue border-transparent text-white [box-shadow:hsl(219,_93%,_30%)_0_-2px_0_0_inset,_hsl(219,_93%,_95%)_0_1px_3px_0] dark:[box-shadow:hsl(219,_93%,_30%)_0_-2px_0_0_inset,_hsl(0,_0%,_0%,_0.4)_0_1px_3px_0] hover:bg-[hsl(219,_93%,_35%)] active:[box-shadow:none] hover:[box-shadow:none] dark:hover:[box-shadow:none] disabled:bg-accent-blue disabled:shadow-none',
  ),
  secondary: cn(
    'text-black dark:text-offgray-50 border-offgray-200/50 dark:border-offgray-400/20 bg-white/50 dark:bg-offgray-300/5 hover:bg-offgray-50/50 dark:hover:bg-offgray-200/10 [box-shadow:hsl(218,_13%,_50%,_0.1)_0_-2px_0_0_inset] dark:[box-shadow:hsl(218,_13%,_70%,_0.08)_0_-2px_0_0_inset] hover:[box-shadow:none] dark:hover:[box-shadow:none] disabled:[box-shadow:none] disabled:hover:bg-offgray-50/60 dark:disabled:hover:bg-offgray-300/5',
  ),
};

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm border px-3 text-xs font-medium tracking-wide transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50',
        'active:translate-y-px disabled:pointer-events-none disabled:opacity-40 motion-reduce:active:translate-y-0',
        'w-full sm:w-auto',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
