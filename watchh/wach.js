const titles = [
    "Shadow City",
    "The Sniper ", 
    "Orbit",
    "Dark Moon", 
    "Last Hope",
    "Extraction", 
    "Army of Thieves", 
    "Baby driver", 
    "I still believe",
    "Eternal Love",
    "Frankenstein",
     "Fair Play",
      "The Girl Next Door",
    "Titanic", 
    "The Green Mile",
     "Extraction 1",
      "Extraction 2",
    "Mad Max: Fury Road",
     "John Wick",
      "The Dark Knight",
       "Gladiator",
    "Die Hard",
     "Extraction",
      "Mission: Impossible - Fallout",
       "The Raid",
    "Terminator 2: Judgment Day",
     "Casino Royale",
      "The Hangover",
    "Superbad",
     "Step Brothers",
      "Dumb and Dumber",
       "We're the Millers",
    "Home Alone",
     "Ace Ventura",
      "The Mask", 
      "Yes Man",
       "21 Jump Street",
    "Dr.Strange",
     "The Vow", 
     "The Union",
      "Mosul",
       "Wing Women",
    "The Hangover", 
    "We’re the Millers",
     "Dumb and Dumber",
    "Central Intelligence", 
    "The Conjuring",
     "Insidious",
      "Annabelle",
    "The Rookie",
     "Red Notice", 
     "The Life List",
      "Five Feet Apart",
    "Before Sunrise",
];

// إنشاء قائمة الأفلام


const movies = [];

for (let i = 0; i < titles.length; i++) {

    let genres = [];

    if (i === 0 || i === 1) genres.push("Action");
    if (i === 2 || i === 3) genres.push("Sci-Fi");
    if (i === 4) {
        genres.push("Horror");
        genres.push("Drama");
    }
    if (i === 5) {
        genres.push("Drama");
        genres.push("Action");
    }
    if (i === 6 || i === 7) genres.push("Comedy");
    if (i === 8 || i === 9) genres.push("Romance");
    if (i === 10 || i === 11) genres.push("Horror");

    movies.push({
    id: i + 1,
    title: titles[i],
    video: `movie${i + 1}.mp4`,
    genres: genres
    });

}



// تعريف عناصر الـ DOM
const grid = document.getElementById("moviesGrid");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const videoPlayer = document.getElementById("videoPlayer");
const closeModal = document.getElementById("closeModal");
const search = document.getElementById("search");

// -------------------------
// دالة عرض الأفلام
// -------------------------
function renderMovies(list) {
    grid.innerHTML = "";
    list.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
            <div class="poster">
                ${movie.id <= 12 ? `<img src="images/movie${movie.id}.jpg" alt="${movie.title}">` : ""}
            </div>
            <div class="movie-title">${movie.title}</div>
            <div class="movie-actions">
                <button data-id="${movie.id}" class="watch">Watch</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// -------------------------
// Pagination
// -------------------------
const itemsPerPage = 12;
let currentPage = 1;



function paginateMovies() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const paginated = filteredMovies.slice(start, end);
    renderMovies(paginated);
    // renderPagination();
}





// -------------------------
// فتح المودال عند الضغط على Watch
// -------------------------
grid.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;
    const id = e.target.dataset.id;
    const movie = movies.find(m => m.id == id);
    modalTitle.textContent = movie.title;
    videoPlayer.src = movie.video;
    modal.style.display = "flex";
});

// إغلاق المودال
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    videoPlayer.pause();
});

// -------------------------
// البحث
// -------------------------
search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    renderMovies(movies.filter(m => m.title.toLowerCase().includes(value)));
});

// -------------------------
// Pagination Prev / Next
// -------------------------
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) { currentPage--; paginateMovies(); }
});


document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        paginateMovies();
    }
});


// -------------------------
// Categories click handler
// -------------------------



function applyAndRender() {
    const active = document.querySelector(".cat.active");
    const genre = active.getAttribute("data-genre");

    filteredMovies = movies;

    // فلترة حسب النوع
    if (genre !== "") {
        filteredMovies = movies.filter(movie =>
            movie.genres.includes(genre)
        );
    }

    // فلترة حسب البحث
    const value = search.value.toLowerCase();
    if (value) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.title.toLowerCase().includes(value)
        );
    }

    currentPage = 1; // مهم جداً
    paginateMovies();
}



const cats = document.querySelectorAll(".cat");
cats.forEach(c => {
    c.addEventListener('click', () => {
        cats.forEach(x => x.classList.remove('active'));
        c.classList.add('active');
        applyAndRender();
    });
});

// -------------------------
// Initial load
// -------------------------
filteredMovies = movies;
paginateMovies();
