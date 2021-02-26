import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="header">
      <div className="header-left">
        <div className="spire-name">SPIRE ART SERVICES</div>
        <div className="links">
          <Link to="/customers" className="link menu-text">
            Customers
          </Link>
          <Link to="/artists" className="link menu-text">
            Artists
          </Link>
          <Link to="/general-information" className="link menu-text">
            General Information
          </Link>
        </div>
      </div>
      <div className="header-right">
        <div className="menu">
          <div className="menu-text">
            {auth.state.userFirstName} {auth.state.userLastName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
