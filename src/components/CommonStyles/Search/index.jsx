import React from "react";
import styles from "./search.module.css";
import Icons from "../../../assets/icons";

export default function Search(props) {
  //! state
  const {
    placeholder,
    label,
    className,
    width,
    fullWidth,
    disabled,
    name,
    value,
    onChange,
    ...res
  } = props;

  //! function

  //! render
  return (
    <div>
      <div className={styles.box}>
        <div className={styles.icon}>
          <Icons.Search />
        </div>

        <input
          className={styles.base}
          name={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ paddingLeft: 30, width: fullWidth ? "100%" : width }}
        />
      </div>
    </div>
  );
}
