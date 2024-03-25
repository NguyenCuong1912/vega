import React, { useRef, useState } from "react";
import styles from "./style.module.css";
import logo from "../../assets/images/logo.png";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import menuSideBar from "../../constants/menuSidebar";
import Icons from "../../assets/icons";
import useOutsideClick from "../../hooks/useOutsideClick";
import { routeLink } from "../../constants/routeBase";
export default function Dashboard(props) {
  //! state
  const { Component } = props;
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const location = useLocation();
  const history = useHistory();
  //! function
  useOutsideClick(modalRef, () => {
    setOpen(false);
  });

  const handleClickMedium = () => {
    setOpen(true);
  };
  const handleBreadcrumb = () => {
    const item = menuSideBar.find((menu) => menu.link === location.pathname);
    if (item) {
      return item.name;
    }
    return "Trang chủ";
  };
  const handleClickHome = () => {
    history.push(routeLink.dashboard);
  };
  //! render
  const renderMenu = () => {
    return menuSideBar?.map((item, index) => {
      return (
        <div key={index} style={{ margin: "10px 0" }}>
          <NavLink
            className={(isActive) =>
              isActive ? styles.activeNavLink : styles.defaultNavLink
            }
            to={item.link}
          >
            {item.name}
          </NavLink>
        </div>
      );
    });
  };
  const renderMedium = () => {
    if (open) {
      return (
        <div ref={modalRef} className={styles.modalMenu}>
          <div className={styles.imageStyle}>
            <img src={logo} alt={logo} width="100%" />
          </div>
          <div className={styles.menu}>{renderMenu()}</div>
          <div className={styles.version}>
            <p>Version 1.0</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <div onClick={handleClickHome} className={styles.imageStyle}>
          <img src={logo} alt={logo} width="100%" />
        </div>
        <div className={styles.menu}>{renderMenu()}</div>
        <div className={styles.version}>
          <p>Version 1.0</p>
        </div>
      </div>
      {renderMedium()}

      <div className={styles.layout}>
        <div className={styles.header}>
          <div>
            <button
              onClick={() => {
                handleClickMedium();
              }}
              className={styles.medium}
            >
              <Icons.Medium />
            </button>
          </div>

          <div className={styles.account}>Cuong Nguyen</div>
        </div>

        <p style={{ padding: "0 15px" }}>{handleBreadcrumb()}</p>

        <div className={styles.content}>{Component ? <Component /> : ""}</div>
        <div className={styles.copyright}>
          <p>Coppright Cuong Nguyen</p>
        </div>
      </div>
    </div>
  );
}
