import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const { currentUser, logout } = useAuth();
  console.log(currentUser);
  const [showMenu, setShowMenu] =
    useState(false);
  const handleLogout = () => {
    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (confirmLogout) {
      logout();
    }
  };
  return (
    <nav className="navbar">
      <h2 className="logo">
        Recipe Planner
      </h2>
      <div className="nav-links">
        <NavLink to="/">
          Home
        </NavLink>

        {currentUser && (
          <>
            <NavLink to="/add-recipe">
              Add Recipe
            </NavLink>

            <NavLink to="/my-recipes">
              My Recipes
            </NavLink>

            <NavLink to="/meal-planner">
              Meal Planner
            </NavLink>

            <NavLink to="/favorites">
              Favorites
            </NavLink>
          </>
        )}

        {currentUser ? (
          <div className="profile-section">
            <button
              className="profile-btn"
              onClick={() =>
                setShowMenu(!showMenu)
              }
            >
              👤 {
                currentUser?.displayName ||
                currentUser?.email?.split("@")[0]
              }
            </button>
            {showMenu && (
              <div className="profile-menu">

                <p>
                  {currentUser?.email}
                </p>

                <NavLink
                  to="/profile"
                  onClick={() =>
                    setShowMenu(false)
                  }
                  className="profile-link"
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/login">
              Login
            </NavLink>

            <NavLink to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;