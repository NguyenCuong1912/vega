import { useState } from "react";

const useToggle = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const shouldRender = open;
  return {
    open,
    toggle,
    shouldRender,
  };
};

export default useToggle;
