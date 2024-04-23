import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  //NavBar display
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/Browse"
          >
            Browse All
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/Request"
          >
            Post Request
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/Trip"
          >
            Post Trip
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/Transactions"
          >
            Transactions
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/Account"
          >
            Account
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/"
          >
            Logout
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
