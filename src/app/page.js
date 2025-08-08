'use client';
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', { name, email });
      alert("login done")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Input Name</h1><br />
        <input type="text" onChange={(e) => setName(e.target.value)} /><br />
        <h1>Email</h1><br />
        <input type="text" onChange={(e) => setEmail(e.target.value)} /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
