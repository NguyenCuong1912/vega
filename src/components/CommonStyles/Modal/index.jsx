import React from "react";
import styles from "./modal.module.css";
export default function Modal(props) {
  //! state
  const { title, open, toggle, width, children, confirm, titleAction, ...res } =
    props;
  //! function
  //! render
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div>
          <button onClick={toggle} className={styles.close}>
            &times;
          </button>
          <h3>{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}
