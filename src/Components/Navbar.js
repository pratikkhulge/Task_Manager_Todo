import React from "react";

const Navbar = (props) => {
  const { userName, logoutHandler } = props;
  return (
    <nav>
      <div className="nav-wrapper teal darken-2">
        <a className="brand-logo center flow-text"> Welcome : {userName}</a>
        <a
          onClick={logoutHandler}
          className="btn-floating btn-large halfway-fab waves-effect waves-light red"
        >
          <i className="material-icons">power_settings_new</i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
