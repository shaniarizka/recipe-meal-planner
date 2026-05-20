import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currentUser, logout } =
    useAuth();

  return (
    <nav className="navbar">
      <h2>Recipe Planner</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/add-recipe">
          Add Recipe
        </Link>

        <Link to="/my-recipes">
          My Recipes
        </Link>

        <Link to="/meal-planner">
          Meal Planner
        </Link>

        {currentUser ? (
          <>
            <span>
              Hello, {currentUser.name}
            </span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;