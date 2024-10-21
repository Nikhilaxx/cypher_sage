import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl">
          CypherSage
        </Link>
        <div>
          <Link to="/" className="text-white px-4">Home</Link>
          <Link to="/about" className="text-white px-4">About</Link>
          <Link to="/contact" className="text-white px-4">Contact</Link>
          <Link to="/register" className="text-white px-4">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
