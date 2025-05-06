import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Nk Auto Resale Zone. All rights reserved.</p>
      <p>Contact: support@nk.ac.in | Phone: +91-9876543210</p>
    </footer>
  );
};

export default Footer;
