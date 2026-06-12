import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";

function Home({
  recipes,
  mealPlans,
  favorites,
}) {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const hour =
    new Date().getHours();
  let greeting =
    "Good Evening";
  if (hour < 12) {
    greeting =
      "Good Morning";
  } else if (hour < 18) {
    greeting =
      "Good Afternoon";
  }
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredRecipes = recipes.filter(
    (recipe) => {
      const keyword =
        searchTerm.toLowerCase();
      const matchSearch =
        recipe.title
          .toLowerCase()
          .includes(keyword) ||
        recipe.category
          ?.toLowerCase()
          .includes(keyword);
      const matchCategory =
        selectedCategory === "All" ||
        recipe.category === selectedCategory;

      return matchSearch && matchCategory;
    }
  );
  const myMealPlans = mealPlans.filter(
    (plan) =>
      plan.userId === currentUser?.uid
  );
  const myFavorites = favorites.filter(
    (fav) =>
      fav.userId === currentUser?.uid
  );
  const totalUserRecipes =
    recipes.filter(
      (recipe) =>
        recipe.source === "user"
    ).length;

  const categories = [
    "All",
    "Breakfast",
    "Chicken",
    "Beef",
    "Seafood",
    "Pasta",
    "Dessert",
    "Vegetarian",
    "Side",
  ];

  const recommendedRecipes = filteredRecipes.slice(0, 3);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>
          {greeting},{" "}
          {currentUser?.displayName || "Chef"} 👋
        </h1>

        <p>
          Explore delicious recipes,
          save favorites,
          and organize your weekly meal plans.
        </p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{recipes.length}</h2>
          <p>Total Recipes</p>
        </div>
        <div className="stat-card">
          <h2>{myMealPlans.length}</h2>
          <p>My Meal Plans</p>
        </div>
        
        <div className="stat-card">
          <h2>{myFavorites.length}</h2>
          <p>My Favorites</p>
        </div>
      </div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <p className="result-count">
        {filteredRecipes.length} recipes found
      </p>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() =>
              setSelectedCategory(category)
            }
          >
            {category}
          </button>
        ))}
      </div>
      {recipes.length === 0 && (
        <div className="empty-state">
          <h2>No Recipes Available</h2>
          <p>
            Add your first recipe.
          </p>
        </div>
      )}
      <div className="section-header">
        <h2>🔥 Recommended Recipes</h2>
      </div>

      <div className="recipe-grid">
        {recommendedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>

      <div className="section-header">
        <h2>📚 All Recipes</h2>
      </div>
      {filteredRecipes.length === 0 ? (
        <div className="empty-state">
          <h2>No Recipes Found 🔍</h2>

          <p>
            Try another keyword
            or category.
          </p>
        </div>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;