import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const AdminNavBar = () => {
  //NavBar display
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
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

export default AdminNavBar;
