import { HTMLAttributes, ReactNode } from "react";
import "./custom-button.css";

interface PropTypes extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  children?: ReactNode;
  classNameIcon?: string;
}

const CustomButton = ({
  className,
  style,
  icon,
  children,
  classNameIcon,
}: PropTypes) => {
  return (
    <button className={` custom-button ${className}`} style={{ ...style }}>
      {icon && <div className={`${classNameIcon}`}>{icon}</div>}
      {children}
    </button>
  );
};

export default CustomButton;
