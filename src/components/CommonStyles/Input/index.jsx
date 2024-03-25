import React from "react";
import styles from "./inpput.module.css";
import Icons from "../../../assets/icons";
import { get } from "lodash";

export default function Input(props) {
  //! state
  const {
    placeholder,
    field,
    form,
    search,
    label,
    className,
    required,
    width,
    fullWidth,
    disabled,
    ...res
  } = props;
  const { onChange, onBlur, name, value } = field || {};
  const { errors, touched } = form || {};
  const errorMsg = get(errors, name);
  const isTouched = get(touched, name);
  const isShowMsg = isTouched && !!errorMsg;

  //! function

  //! render
  return (
    <div style={{ marginBottom: 10 }}>
      {!!label ? (
        <label
          className={required ? styles.requiredLabel : null}
          style={{ margin: 5 }}
        >
          {label}
        </label>
      ) : null}
      <div className={styles.box}>
        {search ? (
          <div className={styles.icon}>
            <Icons.Search />
          </div>
        ) : null}

        <input
          className={styles.base}
          name={name}
          disabled={disabled}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={
            search
              ? { paddingLeft: 30, width: fullWidth ? "100%" : width }
              : { paddingLeft: 0, width: fullWidth ? "100%" : width }
          }
        />
      </div>
      {isShowMsg && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
}
