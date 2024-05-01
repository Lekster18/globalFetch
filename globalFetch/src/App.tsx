import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import TripDisplay from "./components/TripDisplay";
import RequestDisplay from "./components/RequestDisplay";
import RegisterDisplay from "./pages/Register";
import BrowseDisplay from "./pages/Browse";
import Transactions from "./pages/Transaction";
import { useState } from "react";
import UserContext from "./context/user";

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
              <Route path="/browse" element={<BrowseDisplay name={name} />} />
              <Route path="/trip" element={<TripDisplay />} />
              <Route path="/request" element={<RequestDisplay />} />
              <Route path="/transaction" element={<Transactions />} />
              <Route path="/" element={<Login />} />
            </Routes>
          </BrowserRouter>
        )}
        {accessToken.length === 0 && (
          <BrowserRouter>
            <NavBar />
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
