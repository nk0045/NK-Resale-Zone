import React, { useState } from "react";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.endsWith("@gmail.com")) {
      setError("❌ Invalid Email ID. Use a Gmail address.");
    } else {
      setError("");
      alert("Customer Login Successful ✅");
      // Proceed to next logic
    }
  };

  return (
    <div className="login-container">
      <div className="login-box fade-in">
        <h2>Customer Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default CustomerLogin;
