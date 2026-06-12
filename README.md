# ReFiMeal - Recipe Finder & Meal Planner

## Deskripsi

ReFiMeal (Recipe Finder & Meal Planner) adalah aplikasi web yang membantu pengguna mencari, menyimpan, dan mengelola resep makanan sekaligus menyusun meal planner harian maupun mingguan dalam satu platform.

Aplikasi ini dikembangkan menggunakan React, Firebase, dan TheMealDB API untuk memberikan pengalaman pengelolaan resep yang lebih praktis, terorganisir, dan terpersonalisasi.

---

# Latar Belakang

Banyak pengguna menyimpan resep dari berbagai sumber sehingga sulit dikelola dalam satu tempat. Selain itu, pengguna sering mengalami kesulitan dalam merencanakan menu harian maupun mingguan secara terstruktur.

Permasalahan utama yang ditemukan:

* Resep tidak terorganisir dengan baik.
* Tidak tersedia meal planner yang praktis.
* Belum ada rekomendasi menu yang membantu pengguna menentukan pilihan makanan.

---

# Tujuan Proyek

* Mengembangkan aplikasi Recipe Finder & Meal Planner berbasis web.
* Memudahkan pengelolaan dan pencarian resep.
* Membantu perencanaan menu harian dan mingguan.
* Menyediakan rekomendasi resep yang lebih relevan bagi pengguna.

---

# Fitur Utama

## Authentication

* Register akun
* Login akun
* Logout akun
* Protected Route

## Recipe Management

* Menampilkan daftar resep
* Menampilkan detail resep
* Menambahkan resep baru
* Mengedit resep
* Menghapus resep
* Upload gambar resep

## Search & Filter

* Pencarian resep berdasarkan kata kunci
* Filter resep berdasarkan kategori

## Favorites

* Menambahkan resep ke favorit
* Menghapus resep dari favorit

## Meal Planner

* Menambahkan resep ke meal planner
* Mengedit meal planner
* Menghapus meal planner
* Menyusun menu mingguan

## Profile

* Menampilkan informasi pengguna
* Menampilkan data akun yang sedang login

## Recommendation

* Menampilkan rekomendasi resep berdasarkan aktivitas atau kategori yang sering digunakan pengguna

---

# Teknologi yang Digunakan

## Frontend

* React.js
* React Router DOM
* Context API
* CSS

## Backend Services (Serverless)

* Firebase Authentication
* Cloud Firestore
* Firebase Storage

## External API

* TheMealDB API

Digunakan sebagai sumber data resep eksternal yang dapat ditampilkan pada aplikasi.

API Documentation:
https://www.themealdb.com/api.php

---

# Arsitektur Sistem

## Frontend (React)

Menampilkan antarmuka pengguna dan mengelola interaksi pengguna.

## Database (Cloud Firestore)

Menyimpan data pengguna, resep, favorit, dan meal planner.

## Cloud Storage (Firebase Storage)

Menyimpan gambar resep yang diunggah pengguna.

## Backend Services (Firebase)

Menangani autentikasi dan layanan backend secara serverless.

## Struktur Modular

Sistem dipisahkan menjadi beberapa komponen dan halaman agar mudah dikembangkan dan dipelihara.

Alur sistem:

React Frontend
↓
Firebase Authentication
↓
Cloud Firestore / Firebase Storage
↓
TheMealDB API (Data Resep Eksternal)

---

# Struktur Folder

```text
src
│
├── assets
│
├── components
│   ├── Footer.jsx
│   ├── NavBar.jsx
│   ├── ProtectedRoute.jsx
│   ├── RecipeCard.jsx
│   ├── RecommendationSection.jsx
│   └── SearchBar.jsx
│
├── context
│   ├── AuthContext.jsx
│   └── RecipeContext.jsx
│
├── firebase
│   └── firebase.js
│
├── pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── AddRecipe.jsx
│   ├── EditRecipe.jsx
│   ├── RecipeDetail.jsx
│   ├── MyRecipes.jsx
│   ├── Favorites.jsx
│   ├── MealPlanner.jsx
│   └── EditMealPlan.jsx
│
├── service
│   ├── authService.js
│   ├── recipeService.js
│   └── mealApi.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Komponen Aplikasi

* Navbar
* Footer
* SearchBar
* RecipeCard
* RecommendationSection
* ProtectedRoute

---

# Implementasi Sistem

## Frontend

Membangun antarmuka pengguna menggunakan React.

## Routing & Navigation

Menggunakan React Router DOM untuk perpindahan halaman tanpa reload.

## Authentication

Menggunakan Firebase Authentication untuk proses login, register, dan logout.

## Data Storage

Menggunakan Cloud Firestore untuk menyimpan data aplikasi secara real-time.

## Image Storage

Menggunakan Firebase Storage untuk menyimpan gambar resep.

## External Recipe API

Menggunakan TheMealDB API sebagai sumber data resep eksternal.

---

# Cara Menjalankan Project

## Clone Repository

```bash
git clone https://github.com/shaniarizka/recipe-meal-planner.git
```

## Masuk ke Folder Project

```bash
cd recipe-meal-planner
```

## Install Dependency

```bash
npm install
```

## Jalankan Project

```bash
npm run dev
```

## Build Production

```bash
npm run build
```

---

# Pembagian Tugas

## Shania Rizka Anindia (2308107010067)

* Firebase Integration
* API Configuration (TheMealDB)
* Meal Planner
* Favorites Resep

## Thahira Riska (2308107010024)

* Frontend UI/UX
* Authentication
* Profile
* Recommendation

## Arifa Muthmainnah (2308107010012)

* Recipe Management (CRUD Recipe, Search & Filter)
* Routing & Navigation
* Frontend UI/UX
* Testing & Documentation

---

# Repository

GitHub:
https://github.com/shaniarizka/recipe-meal-planner

---

# Pengembang

Kelompok 13

* Arifa Muthmainnah (2308107010012)
* Thahira Riska (2308107010024)
* Shania Rizka Anindia (2308107010067)
