const titles = [
    "Shadow City",
    "Eternal Love",
    "Orbit",
    "Dark Moon",
    "Last Hope",
    "Extraction",
    "carry on",
    "Batman",
    "The secret service",
    "The sniper 1",
    "The sniper 2",
    "Fair play",
    "The girl next door",
    "Titanic",
    "The green mile",
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
    "Dr.strange",
    "The Vow",
    "The union",
    "Mosul",
    "Wing women",
    "The Hangover",
    "We’re the Millers",
    "Dumb and Dumber",
    "Central Intelligence",
    "The Conjuring",
    "Insidious",
    "Annabelle",
    "The Rookie",
    "Red notice",
    "The life list",
    "Five Feet Apart",
    "Before Sunrise",
    
];

const movies = [];

for (let i = 0; i < titles.length; i++) {
    movies.push({
        id: i + 1,
        title: titles[i],
        video: `movie${i + 1}.mp4`
    });
}


const grid = document.getElementById("moviesGrid");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const videoPlayer = document.getElementById("videoPlayer");
const closeModal = document.getElementById("closeModal");
const search = document.getElementById("search");

function renderMovies(list) {
    grid.innerHTML = "";

    list.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <div class="poster"></div>
            <div class="movie-title">${movie.title}</div>
            <div class="movie-actions">
                <button data-id="${movie.id}">Watch</button>
            </div>
        `;

        grid.appendChild(card);
    });
}

renderMovies(movies);

/* OPEN MODAL */
grid.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;

    const id = e.target.dataset.id;
    const movie = movies.find(m => m.id == id);

    modalTitle.textContent = movie.title;
    videoPlayer.src = movie.video;
    modal.style.display = "flex";
});

/* CLOSE MODAL */
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    videoPlayer.pause();
});

/* SEARCH */
search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    renderMovies(
        movies.filter(m => m.title.toLowerCase().includes(value))
    );
});

const itemsPerPage = 9;
let currentPage = 1;

function paginateMovies() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = movies.slice(start, end);

    renderMovies(paginated);
    renderPagination();
}

function renderPagination() {
    const pageNumbers = document.getElementById("pageNumbers");
    const paginationInfo = document.getElementById("paginationInfo");

    pageNumbers.innerHTML = "";

    const totalPages = Math.ceil(movies.length / itemsPerPage);

    let startPage = Math.max(1, currentPage);
    let endPage = Math.min(totalPages, startPage + 2);

    if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;

        if (i === currentPage) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            currentPage = i;
            paginateMovies();
        });

        pageNumbers.appendChild(btn);
    }

    paginationInfo.textContent =
        `${startIndex() + 1} - ${endIndex()} of ${movies.length} movies`;
}


function startIndex() {
    return (currentPage - 1) * itemsPerPage;
}

function endIndex() {
    return Math.min(currentPage * itemsPerPage, movies.length);
}




/* PREV / NEXT */
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        paginateMovies();
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(movies.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        paginateMovies();
    }
});

/* INITIAL LOAD */
paginateMovies();

