import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import "./Account.module.css";

interface User {
  id: number;
  name: string;
  country: string;
  city: string;
  role: string;
}

const Accounts: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await fetchData(
      "/auth/users",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setUsers(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const deleteUser = async (id: number) => {
    const res = await fetchData(
      "/auth/users/" + id,
      "DELETE",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      getUsers();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <div className="container">
      <div className="table-container">
        <h1>Admin Page</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Country</th>
              <th>City</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.country}</td>
                <td>{user.city}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Accounts;
