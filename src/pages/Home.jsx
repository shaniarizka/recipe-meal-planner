import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { useAuth } from "../context/AuthContext";

function Home({
  recipes,
  mealPlans,
  favorites,
}) {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");
  const filteredRecipes = recipes.filter(
    (recipe) => {
      const matchSearch = recipe.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === "All" ||
        recipe.category === selectedCategory;

      return matchSearch && matchCategory;
    }
  );
  const totalRecipes = recipes.length;
  const totalMealPlans = mealPlans.length;
  const totalFavorites =
    recipes.filter(
      (recipe) =>
        recipe.source === "user"
    ).length;

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>
          Welcome Back,
          {" "}
          {currentUser?.displayName || "Chef"} 👋
        </h1>

        <p>
          Discover recipes, organize your meals,
          and plan your week more efficiently.
        </p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{totalRecipes}</h2>
          <p>Total Recipes</p>
        </div>
        <div className="stat-card">
          <h2>{totalMealPlans}</h2>
          <p>Meal Plans</p>
        </div>
        <div className="stat-card">
          <h2>{totalFavorites}</h2>
          <p>User Recipes</p>
        </div>
        <div className="stat-card">
          <h2>{favorites.length}</h2>
          <p>Favorites</p>
        </div>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={
          setSelectedCategory
        }
      />

      <div className="section-header">
        <h2>🔥 Recommended Recipes</h2>
      </div>

      <div className="recipe-grid">
        {filteredRecipes.slice(0, 3).map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>

      <div className="section-header">
        <h2>📚 All Recipes</h2>
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>

    </div>
  );
}

export default Home;