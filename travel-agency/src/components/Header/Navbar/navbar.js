import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  // Get the current location object using useLocation()
  const location = useLocation();

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark mdb-color darken-2 scrolling-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <strong>Travel Agency</strong>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                <Link className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === "/enquiry" ? "active" : ""}`}>
                <Link className="nav-link" to="/enquiry">
                  All Enquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
