import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 mb-3">
      <Link className="navbar-brand" to="/clients">
        Navbar
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/clients">
              Clients
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/articles">
              Articles
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
