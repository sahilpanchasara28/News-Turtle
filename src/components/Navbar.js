import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          NewsTurtle
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link className="nav-link active" to="/">
              Home
            </Link>
            <Link className="nav-link active" to="/business">
              Business
            </Link>
            <Link className="nav-link active" to="/entertainment">
              Entertainment
            </Link>
            <Link className="nav-link active" to="/health">
              Health
            </Link>
            <Link className="nav-link active" to="/science">
              Science
            </Link>
            <Link className="nav-link active" to="/sports">
              Sports
            </Link>
            <Link className="nav-link active" to="/technology">
              Technology
            </Link>
            <Link className="nav-link active" to="/custom-search">
              Custom Search
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
