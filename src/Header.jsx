import React from "react";
import logo from './assets/MyNKLogo.png';
const Header = () => {
  
  return (
    <header className="header">
      <div className="header-left">
        <a href="/">
        <img
          src={logo} 
          alt="NK Car Dealer Logo"
          className="logo"
        />
        </a>
        
        
        
        <h1>NK Auto Resale Zone</h1>
      </div>
      <div className="slogan">Pre Owned, Still Prime</div>
    </header>
  );
};

export default Header;
