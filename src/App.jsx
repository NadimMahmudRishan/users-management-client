import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [users, setusers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setusers(data));
  }, []);
  return (
    <>
      <h1>Users Management System</h1>
      <h3>Number of the users : {users.length}</h3>
      <div>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} : {user.name} : {user.email}
          </li>
        ))}
      </div>
    </>
  );
}

export default App;
