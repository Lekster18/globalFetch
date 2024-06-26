import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import TripDisplay from "./components/TripDisplay";
import RequestDisplay from "./components/RequestDisplay";
import RegisterDisplay from "./pages/Register";
import BrowseDisplay from "./pages/Browse";
import { useState } from "react";
import UserContext from "./context/user";
import Accounts from "./pages/Account";
import AdminNavBar from "./components/AdminNavBar";
import TransactionDisplay from "./pages/Transaction";
import TransactionAdmin from "./pages/AdminTransaction";

function App() {
  const [accessToken, setAccessToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <>
      <UserContext.Provider
        value={{ accessToken, setAccessToken, role, setRole, name, setName }}
      >
        {role === "User" && accessToken.length > 0 && (
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/browse" element={<BrowseDisplay />} />
              <Route path="/trip" element={<TripDisplay />} />
              <Route path="/request" element={<RequestDisplay />} />
              <Route path="/transaction" element={<TransactionDisplay />} />
              <Route path="/" element={<Login />} />
            </Routes>
          </BrowserRouter>
        )}
        {role === "Admin" && accessToken.length > 0 && (
          <BrowserRouter>
            <AdminNavBar />
            <Routes>
              <Route path="/account" element={<Accounts />} />
              <Route path="/transactions" element={<TransactionAdmin />} />
              <Route path="/" element={<Login />} />
            </Routes>
          </BrowserRouter>
        )}
        {accessToken.length === 0 && (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<RegisterDisplay />} />
            </Routes>
          </BrowserRouter>
        )}
      </UserContext.Provider>
    </>
  );
}

export default App;
