import Link from "next/link";
import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  children?: any;
  icon?: any;
  href?: any;
}
const ButtonLink = ({
  children,
  icon,
  href,
  ...props
}: ButtonProps) => {
  return (
    <Link href={href} {...props}>
      {children}
      {icon && <span>{icon}</span>}
    </Link>
  );
};

export default ButtonLink;
