import React from "react";

export const authFormStyles = () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return undefined;

  const navbarHeight = navbar.offsetHeight;
  const bodyHeight = document.body.offsetHeight;
  const componentHeight = bodyHeight - navbarHeight;

  const style: React.CSSProperties = {
    minHeight: `${componentHeight}px`,
  };

  return style;
};
