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

  const handelAdduser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const newUser = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users,data];
        setusers(newUsers)
        // console.log("inside post response", data);
      });

      form.reset();
  };

  return (
    <>
      <h1>Users Management System</h1>
      <form onSubmit={handelAdduser}>
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" />
        <br />
        <button type="submit">Add user</button>
      </form>
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
