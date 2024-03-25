import React, { useCallback } from "react";
import styles from "./calendar.module.css";
import { get } from "lodash";
import moment from "moment";

export default function Calendar(props) {
  //! state
  const { label, options, required, width, fullWidth, field, form, ...res } =
    props;

  const { onChange, onBlur, name, value } = field || {};
  const { errors, touched } = form || {};
  const errorMsg = get(errors, name);
  const isTouched = get(touched, name);
  const isShowMsg = isTouched && !!errorMsg;
  //! function
  const convertValue = useCallback(() => {
    return moment(value).format("YYYY-MM-DD");
  }, [value]);
  //! render
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
        <input
          type="date"
          className={styles.base}
          name={name}
          value={convertValue()}
          onChange={onChange}
          onBlur={onBlur}
          style={{ width: fullWidth ? "100%" : width }}
        />
      </div>
      {isShowMsg && <p className={styles.error}>{errorMsg}</p>}
    </div>
  );
}
