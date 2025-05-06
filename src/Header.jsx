import React from "react";
import logo from './assets/Nk_Logo.png';
const Header = () => {
  
  return (
    <header className="header">
      <div className="header-left">
        <img
          src={logo} // Replace with your actual logo URL
          alt="NK Car Dealer Logo"
          className="logo"
        />
        <h1>NK Auto Resale Zone</h1>
      </div>
      <div className="slogan">Pre Owned, Still Prime</div>
    </header>
  );
};

export default Header;
