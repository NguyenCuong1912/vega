import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivatePage from "./HOC/privatePage";
import { routes } from "./constants/routeBase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TIMEOUT_CLOSE_TOAST } from "./constants/constants";
export default function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={TIMEOUT_CLOSE_TOAST}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        {routes?.map((item, index) => {
          return (
            <PrivatePage
              key={index}
              path={item.path}
              exact={item.exact}
              Component={item.Component}
            />
          );
        })}
      </Switch>
    </Router>
  );
}
