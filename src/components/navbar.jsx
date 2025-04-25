// component/NavBar.js

import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/"  className={({ isActive }) => {
      return isActive ? "active-link" : "";
    }}>Mark Players</NavLink>
        </li>
        <li>
          <NavLink to="/markedItems"  className={({ isActive }) => {
      return isActive ? "active-link" : "";
    }}>Marked Players</NavLink>
        </li>
       
      </ul>
    </nav>
  );
};

export default NavBar;