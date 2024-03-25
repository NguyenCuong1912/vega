import React from "react";
import styles from "./button.module.css";

export default function Button(props) {
  //! state
  const { children, onClick, Icons, variant, color, type, ...res } = props;
  //! function
  const styleVariant = () => {
    if (variant === "outline") {
      return {
        borderColor: color ?? "#ffb300",
        background: "#fff",
        color: color ?? "#ffb300",
      };
    } else if (variant === "contained") {
      return {
        background: color ?? "#ffb300",
        color: "#ffffff",
      };
    } else {
      return {
        background: "transparent",
        color: "#000",
      };
    }
  };
  //! render
  return (
    <div>
      <button
        className={styles.base}
        type={type}
        style={styleVariant()}
        {...res}
        onClick={onClick}
      >
        {Icons ? <Icons /> : null}
        {children}
      </button>
    </div>
  );
}
