import React from "react";
import "./Button.styles.scss";

type ButtonProps = {
  width: "wide" | "full";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  type?: string;
};

const Button = ({ width, onClick, children, type }: ButtonProps) => {
  const widthMap = {
    wide: "btn--wide",
    full: "btn--full",
  };

  const buttonClassNames = `btn ${widthMap[width] || ""}`;

  return (
    <button className={buttonClassNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
