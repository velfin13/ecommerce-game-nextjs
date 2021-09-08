import React from "react";
import MenuWeb from "./MenuWeb";
import TopBar from "./TopBar/TopBar";

const Header = () => {
  return (
    <div className="header">
      <TopBar />
      <MenuWeb />
    </div>
  );
};

export default Header;
