import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!foundUser) {
      alert("Invalid credentials");

      return;
    }

    login(foundUser);

    navigate("/");
  };

  return (
    <div className="form-container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;