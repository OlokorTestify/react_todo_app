import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../../store/actions/auth";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <header style={headerStyle}>
      <h1>Todo list</h1>
      {isLoggedIn ? (
        <>
          <Link style={linkStyle} to="/">
            Home
          </Link>
          |
          <div
            style={linkStyle}
            onClick={() => {
              dispatch(logOut());
              history.push("/signin");
            }}
          >
            Log Out
          </div>
        </>
      ) : (
        <Link style={linkStyle} to="/signin">
          Log In
        </Link>
      )}
      |
      <Link style={linkStyle} to="/about">
        About
      </Link>
    </header>
  );
};

const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
};
const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};
export default Header;
