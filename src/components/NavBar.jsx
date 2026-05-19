import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Recipe Planner</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add-recipe">Add Recipe</Link>
        <Link to="/my-recipes">My Recipes</Link>
        <Link to="/meal-planner">Meal Planner</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;