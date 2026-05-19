import dummyRecipes from "../data/dummyRecipes";
import RecipeCard from "../components/RecipeCard";

function Home() {
  return (
    <div className="home-container">
      <h1>Recipe Finder</h1>

      <div className="recipe-grid">
        {dummyRecipes.map((recipe) => (
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