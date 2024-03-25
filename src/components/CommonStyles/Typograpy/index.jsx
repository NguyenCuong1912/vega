import React from "react";

export default function Typograpy(props) {
  const { children, ...res } = props;
  return <p style={{ margin: "2px" }}>{children}</p>;
}
