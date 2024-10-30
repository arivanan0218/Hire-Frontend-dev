import React from 'react';
import './Header.css';
import Logo1 from "../../assets/icons/HireNavLogo.png";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar">
      <div className="logoContainer">
        <Link to="/"><img src={Logo1} alt="Logo" className="logo" /></Link>
      </div>
      <nav className="nav-links">
        <a href='/'>Home</a>
        <a href='/cervices'>Services</a>
        <a href='/about'>About</a>
      </nav>
      <Link to="/login"><button className='loginButton'>Login</button></Link>
    </header>
  );
};

export default Header;
