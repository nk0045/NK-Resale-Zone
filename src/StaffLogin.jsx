import React, { useState } from "react";

const StaffLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.endsWith("@nk.ac.in")) {
      setError("❌ Invalid ID. Must be a NK Staff ID.");
    } else {
      setError("");
      alert("Staff Login Successful ✅");
      // Proceed to admin features or dashboard
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Staff Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;
