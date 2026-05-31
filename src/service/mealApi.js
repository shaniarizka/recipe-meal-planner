export const fetchMeals = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );

    const data = await response.json();

    return (
      data.meals?.map((meal) => {
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
          const ingredient =
            meal[`strIngredient${i}`];

          if (
            ingredient &&
            ingredient.trim() !== ""
          ) {
            ingredients.push(
              ingredient
            );
          }
        }

        return {
          id: `api-${meal.idMeal}`,
          title: meal.strMeal,
          category:
            meal.strCategory,
          image:
            meal.strMealThumb,
          ingredients,
          steps:
            meal.strInstructions,
          source: "api",
        };
      }) || []
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};