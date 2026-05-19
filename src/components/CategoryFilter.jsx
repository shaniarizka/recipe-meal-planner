const categories = [
  "All",
  "Makanan Berat",
  "Cemilan",
  "Kue",
  "Minuman",
];

function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="category-container">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={
            selectedCategory === category
              ? "active-category"
              : ""
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;