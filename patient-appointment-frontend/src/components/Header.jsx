import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return ( 
    <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul className="nav col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 text-secondary text-white">Home</Link></li>
          <li><Link to="/create-patient" className="nav-link px-2 text-white">Create Patient</Link></li>
          <li><Link to="/patients-list" className="nav-link px-2 text-white">Patients List</Link></li>
          <li><Link to="/search-patient" className="nav-link px-2 text-white">Search Patient</Link></li>
        </ul>        
      </div>
    </div>
  </header>
    );
};

export default Header;