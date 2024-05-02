import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useContext } from "react";
import UserContext from "../context/user";

const AdminNavBar = () => {
  const userCtx = useContext(UserContext);
  const handleLogout = () => {
    userCtx.setRole("");
    userCtx.setAccessToken("");
  };
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/transactions"
            >
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminNavBar;
