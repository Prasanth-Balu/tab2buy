
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>🛍️ Tap2Buy</h3>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
      <div className="footer-right">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </footer>
  );
};

export default Footer;
