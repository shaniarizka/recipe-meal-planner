import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RecommendationSection from "../components/RecommendationSection";
import { useState } from "react";
import { addDoc, deleteDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function RecipeDetail({
  recipes,
  mealPlans,
  setMealPlans,
  favorites,
  setFavorites,
}) {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [mealType, setMealType] = useState("Breakfast");
  const recipe = recipes.find(
    (item) => item.id === id
  );
  const handleFavorite = async () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }
    try {
      if (isFavorite) {
        const favoriteToDelete =
          favorites.find(
            (fav) =>
              fav.recipeId === recipe.id &&
              fav.userId === currentUser.uid
          );
        await deleteDoc(
          doc(
            db,
            "favorites",
            favoriteToDelete.id
          )
        );
        setFavorites(
          favorites.filter(
            (fav) =>
              fav.id !==
              favoriteToDelete.id
          )
        );
      } else {
        const docRef =
          await addDoc(
            collection(
              db,
              "favorites"
            ),
            {
              userId:
                currentUser.uid,
              recipeId: recipe.id,
            }
          );
        setFavorites([
          ...favorites,
          {
            id: docRef.id,
            userId:
              currentUser.uid,
            recipeId: recipe.id,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToMealPlanner = async () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    try {
      const docRef = await addDoc(
        collection(db, "mealPlans"),
        {
          userId: currentUser.uid,
          recipeId: recipe.id,
          recipeTitle: recipe.title,
          day: selectedDay,
          mealType: mealType,
        }
      );

      const newPlan = {
        id: docRef.id,
        userId: currentUser.uid,
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        day: selectedDay,
        mealType: mealType,
      };

      setMealPlans([
        ...mealPlans,
        newPlan,
      ]);

      alert("Added to Meal Planner");
    } catch (error) {
      console.log(error);
      alert("Failed to add meal plan");
    }
  };

  if (!recipe) {
    return <h1>Recipe Not Found</h1>;
  }
  const isFavorite =
    favorites.some(
      (fav) =>
        fav.recipeId === recipe.id &&
        fav.userId === currentUser?.uid
    );

  return (
    <div className="detail-container">
      <div className="detail-layout">
        {/* Kolom Kiri */}
        <div className="detail-image-section">
          <img
            src={
              recipe.image ||
              "https://via.placeholder.com/600x400?text=No+Image"
            }
            alt={recipe.title}
            className="detail-image"
          />
        </div>

        {/* Kolom Kanan */}
        <div className="detail-content-section">
          <h1>{recipe.title}</h1>
          <button
            onClick={handleFavorite}
            className="favorite-btn"
          >
            {isFavorite
              ? "❤️ Favorited"
              : "🤍 Add Favorite"}
          </button>
          <span className="recipe-category">
            {recipe.category}
          </span>
          <div className="ingredients-card">
            <h2>Ingredients</h2>
            <div className="ingredients-list">
              {recipe.ingredients.map(
                (ingredient, index) => (
                  <div
                    key={index}
                    className="ingredient-item"
                  >
                    🥘 {ingredient}
                  </div>
                )
              )}
            </div>
          </div>
          <h2>Cooking Steps</h2>
          <ol className="steps-list">
            {recipe.steps
              .split(".")
              .filter(
                (step) => step.trim() !== ""
              )
              .map((step, index) => (
                <li key={index}>
                  {step.trim()}.
                </li>
              ))}
          </ol>

          <div className="planner-options">
            <select
              value={selectedDay}
              onChange={(e) =>
                setSelectedDay(e.target.value)
              }
            >
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>

            <select
              value={mealType}
              onChange={(e) =>
                setMealType(e.target.value)
              }
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>
          </div>

          <button
            onClick={handleAddToMealPlanner}
            className="planner-btn"
          >
            Add to Meal Planner
          </button>
        </div>
      </div>
      <RecommendationSection
        recipes={recipes}
        currentRecipe={recipe}
      />
    </div>
  );
}

export default RecipeDetail;