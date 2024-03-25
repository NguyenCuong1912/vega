import React, { useRef } from "react";
import styles from "./buttonAction.module.css";
import CommonStyles from "..";
import Icons from "../../../assets/icons";
import useToggle from "../../../hooks/useToggle";
import useOutsideClick from "../../../hooks/useOutsideClick";

const ButtonAction = ({ handelEdit, handleDelete }) => {
  //! state
  const { open, toggle, shouldRender } = useToggle();
  const modalRef = useRef(null);
  //! function
  useOutsideClick(modalRef, () => {
    toggle();
  });
  //! render
  return (
    <div>
      <CommonStyles.Button
        onClick={toggle}
        Icons={Icons.ThreeDot}
      ></CommonStyles.Button>
      <div className={styles.popover}>
        {shouldRender && (
          <div ref={modalRef} className={styles.popoverContent}>
            <div className={styles.button}>
              <CommonStyles.Button onClick={handelEdit}>
                Sửa hồ sơ
              </CommonStyles.Button>
            </div>
            <div className={styles.button}>
              <CommonStyles.Button onClick={handleDelete}>
                Xoá hồ sơ
              </CommonStyles.Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonAction;
