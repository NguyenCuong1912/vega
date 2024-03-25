import React from "react";
import styles from "./select.module.css";
import { get } from "lodash";

export default function Select(props) {
  //! state
  const { label, options, required, width, fullWidth, form, field, ...res } =
    props;

  const { onChange, onBlur, name, value } = field || {};
  const { errors, touched } = form || {};
  const errorMsg = get(errors, name);
  const isTouched = get(touched, name);
  const isShowMsg = isTouched && !!errorMsg;

  //! funcion

  //! render
  const renderOptions = () => {
    return options?.map((item, index) => {
      return (
        <option value={item.value} key={index}>
          {item.name}
        </option>
      );
    });
  };
  return (
    <div style={{ marginBottom: 10 }}>
      {!!label ? (
        <label
          className={required ? styles.requiredLabel : null}
          htmlFor={name}
          style={{ margin: 5 }}
        >
          {label}
        </label>
      ) : null}
      <div>
        <select
          className={styles.base}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{ width: fullWidth ? "100%" : width }}
        >
          {renderOptions()}
        </select>
      </div>
      {isShowMsg && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
}
