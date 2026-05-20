import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const newUser = {
      id: Date.now(),

      name,

      email,

      password,
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Register Success");

    navigate("/login");
  };

  return (
    <div className="form-container">
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;