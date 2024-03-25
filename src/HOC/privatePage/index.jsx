import React from "react";

import { Route } from "react-router-dom";
import Dashboard from "../../layout/dashboard";

export default function PrivatePage(props) {
  //! state
  const { Component, ...resRoute } = props;
  //! function
  //! render
  return (
    <Route
      {...resRoute}
      render={(propsRoute) => {
        return <Dashboard Component={Component} />;
      }}
    ></Route>
  );
}
