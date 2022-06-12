import React from "react";

interface Props {
  children: React.ReactNode;
  showNavMenu: boolean;
}

export const Layout: React.FC<Props> = ({ children, showNavMenu }) => {
  return (
    <div>
      {showNavMenu && <div>Nav menu</div>}
      <div>{children}</div>
    </div>
  );
};
