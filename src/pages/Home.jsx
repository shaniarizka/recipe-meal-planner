import { useState } from "react";

import dummyRecipes from "../data/dummyRecipes";

import RecipeCard from "../components/RecipeCard";

import SearchBar from "../components/SearchBar";

import CategoryFilter from "../components/CategoryFilter";

function Home() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const filteredRecipes = dummyRecipes.filter(
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

  return (
    <div className="home-container">
      <h1>Recipe Finder</h1>

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