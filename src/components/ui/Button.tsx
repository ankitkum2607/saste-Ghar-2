"use client";

import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-800 shadow-soft",
  secondary: "bg-secondary text-white hover:bg-secondary-700 shadow-soft",
  accent: "bg-accent text-primary-950 hover:bg-accent-600 hover:text-white shadow-soft font-semibold",
  outline:
    "border border-line-strong text-primary hover:bg-cream",
  ghost: "text-primary hover:bg-cream",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-[52px] px-8 text-base",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsButton extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "relative inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = "primary", size = "md", className } = props;
    const classes = cn(base, variants[variant], sizes[size], className);

    if ("href" in props && props.href !== undefined) {
      const { href, children, target, rel, onClick } = props;
      const external = href.startsWith("http");
      return (
        <Link
          href={href}
          target={target}
          rel={rel || (external ? "noopener noreferrer" : undefined)}
          className={classes}
          onClick={onClick}
        >
          {children}
        </Link>
      );
    }

    const {
      children,
      onClick,
      variant: _variant,
      size: _size,
      className: _className,
      ...rest
    } = props as ButtonAsButton;
    return (
      <button ref={ref} className={classes} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }
);
