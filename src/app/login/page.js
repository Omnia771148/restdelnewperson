 
 'use client';

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [restId, setRestId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "kushas" && password === "1234") {
      localStorage.setItem("restid", "1");
      setRestId("1");
      alert("restid set to 1 in localStorage.");
      
    } else if (email === "sno" && password === "12345") {
      localStorage.setItem("restid", "3");
      setRestId("3");
      alert("restid set to 1 in localStorage.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      {restId && (
        <div style={{ marginTop: '20px' }}>
          <h3>Stored Rest ID: {restId}</h3>
        </div>
      )}
    </div>
  );
}