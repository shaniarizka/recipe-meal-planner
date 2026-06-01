export const fetchMeals = async () => {
  try {
    const categories = [
      "Breakfast",
      "Chicken",
      "Beef",
      "Seafood",
      "Pasta",
      "Dessert",
      "Vegetarian",
      "Side",
      "Starter",
    ];

    let allMeals = [];

    for (const category of categories) {
      const response =
        await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );

      const data =
        await response.json();

      if (data.meals) {
        allMeals = [
          ...allMeals,
          ...data.meals.slice(0, 5),
        ];
      }
    }

    const detailedMeals =
      await Promise.all(
        allMeals.map(
          async (meal) => {
            const detailResponse =
              await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
              );

            const detailData =
              await detailResponse.json();

            return detailData.meals[0];
          }
        )
      );

    return detailedMeals.map(
      (meal) => {
        const ingredients = [];

        for (
          let i = 1;
          i <= 20;
          i++
        ) {
          const ingredient =
            meal[
              `strIngredient${i}`
            ];

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
      }
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};