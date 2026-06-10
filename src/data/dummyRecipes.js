const dummyRecipes = [
  {
    id: 1,
    userId: 1,
    title: "Nasi Goreng",
    category: "Makanan Berat",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19",

    ingredients: [
      "Nasi",
      "Telur",
      "Kecap",
      "Bawang",
    ],

    steps:
      "Tumis bawang, masukkan telur, nasi, lalu tambahkan kecap.",
  },

  {
    id: 2,
    userId: 2,
    title: "Donat Coklat",
    category: "Kue",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307",

    ingredients: [
      "Tepung",
      "Gula",
      "Coklat",
    ],

    steps:
      "Campur bahan lalu goreng hingga matang.",
  },

  {
    id: 3,
    userId: 1, 
    title: "Es Teh Lemon",
    category: "Minuman",
    image:
      "https://images.unsplash.com/photo-1499638673689-79a0b5115d87",

    ingredients: [
      "Teh",
      "Lemon",
      "Es Batu",
    ],

    steps:
      "Seduh teh lalu tambahkan lemon dan es.",
  },

  {
    id: 4,
    userId: 2, 
    title: "Kentang Goreng",
    category: "Cemilan",
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f",

    ingredients: [
      "Kentang",
      "Garam",
      "Minyak",
    ],

    steps:
      "Potong kentang lalu goreng hingga renyah.",
  },
];

export default dummyRecipes;