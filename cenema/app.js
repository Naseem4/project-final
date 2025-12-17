

const movies = [
    { id: 1, title: 'Suits', genres: ['Drama'], length: 134, rating: 'PG-13', lang: 'EN', poster: 'suits.jpg', trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ', desc: 'A high-octane chase across a neon metropolis.' },
    { id: 2, title: 'A quit place', genres: ['Horror'], length: 112, rating: 'PG', lang: 'EN', poster: 'quit.png', trailer: 'https://www.youtube.com/embed/p9wE8dyzEJE', desc: 'A soulful tale of love and second chances.' },
    { id: 3, title: 'Batman The Dark Knight', genres: ['Action', 'Sci-Fi'], length: 148, rating: 'PG-13', lang: 'EN', poster: 'batmaan.jpg', trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ', desc: 'Humanity reaches for the stars � and confronts itself.' },
    { id: 4, title: 'Home alone', genres: ['Action', 'Comedy'], length: 98, rating: 'PG', lang: 'EN', poster: 'homealone.jpg', trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ', desc: 'A small-town troupe goes viral overnight.' },
    { id: 5, title: 'John wick', genres: ['Action'], length: 130, rating: 'R', lang: 'EN', poster: 'john.jpg', trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ', desc: 'A poetic sci-fi about memory and identity.' }
];

// DOM 
const moviesGrid = document.getElementById('moviesGrid');//تعريف المتغيرات للتخزين
const cats = Array.from(document.querySelectorAll('.cat'));
const searchInput = document.getElementById('globalSearch');
const sortSelect = document.getElementById('sortSelect');
const resultCount = document.getElementById('resultCount');
const heroPoster = document.getElementById('heroPoster');

// hero posters
if (movies[0] && heroPoster) heroPoster.style.backgroundImage = `url('${movies[0].poster}')`;//لعرض صور الافلام ازا كان موجود خانة للفلم

// Hero
function renderMovies(list) {
    moviesGrid.innerHTML = '';//منفرغ القائمة عشان نعرض بس اسم الفلم اللي بنطبق على النوع (horror /else)
    resultCount.textContent = list.length;//عدد الافلام اللي طلعت معنا 
    if (!list.length) {
        moviesGrid.innerHTML = `<div class="card" style="padding:24px;">No results found</div>`;
        return;
    }
    list.forEach(m => {
        const el = document.createElement('article');//عملنا element عشان نقدر نغير على ال html
        el.className = 'card-movie';
        el.innerHTML = `
      <div class="poster" style="background-image:url('${m.poster}')" role="img" aria-label="${m.title} poster"></div>
      <div class="movie-title">${m.title}</div>
      <div class="movie-meta"><span>${m.genres.join(' � ')}</span><span>${m.length} min</span></div>
      <div class="movie-actions">
        <button class="btn" data-id="${m.id}" data-action="details">Details</button>
        <button class="btn primary" data-id="${m.id}" data-action="book">Book</button>
      </div>
    `;
        moviesGrid.appendChild(el);// عشان نضيفه على ال moviesgrid
    });
}

// السيرش و هاي الاشياء
function getActiveGenre() {
    const active = document.querySelector('.cat.active');
    return active ? active.getAttribute('data-genre') : '';
}

function currentList() {
    const q = (searchInput.value || '').trim().toLowerCase();
    const genre = getActiveGenre();
    let list = movies.slice();
    if (genre) list = list.filter(m => m.genres.includes(genre));
    if (q) list = list.filter(m => (m.title + ' ' + m.genres.join(' ') + ' ' + (m.desc || '')).toLowerCase().includes(q));
    const sort = sortSelect.value;
    if (sort === 'short') list.sort((a, b) => a.length - b.length);
    if (sort === 'alpha') list.sort((a, b) => a.title.localeCompare(b.title, 'en'));
    return list;
}

function applyAndRender() { renderMovies(currentList()); }

// category click
cats.forEach(c => {
    c.addEventListener('click', () => {
        cats.forEach(x => x.classList.remove('active'));
        c.classList.add('active');
        applyAndRender();
    });
});

// search + sort events
searchInput.addEventListener('input', debounce(() => applyAndRender(), 220));
sortSelect.addEventListener('change', applyAndRender);

// initial
renderMovies(movies);

// delegation for details/book
document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    if (action === 'details' && id) { openModal(movies.find(x => x.id == id)); }
    if (action === 'book' && id) { openBooking(movies.find(x => x.id == id)); }
    if (btn.id === 'watchPromo') { openModal(movies[0]); }
    if (btn.id === 'bookNow') { openBooking(movies[0]); }
});

// Modal logic
function openModal(movie) {
    if (!movie) return;
    const tpl = document.getElementById('modal-template').content.cloneNode(true);
    const backdrop = tpl.querySelector('.modal-backdrop');
    // fill content
    backdrop.querySelector('#modalTitle').textContent = movie.title;
    backdrop.querySelector('#modalGenres').textContent = movie.genres.join(' � ');
    backdrop.querySelector('#modalDesc').textContent = movie.desc;
    backdrop.querySelector('#modalLength').textContent = movie.length;
    backdrop.querySelector('#modalRating').textContent = movie.rating;
    backdrop.querySelector('#modalLang').textContent = movie.lang;
    backdrop.querySelector('#modalPoster').style.backgroundImage = `url('${movie.poster}')`;

    const close = backdrop.querySelector('[data-close]');
    const play = backdrop.querySelector('#playTrailer');
    const trailerWrap = backdrop.querySelector('#trailerWrap');
    const iframe = backdrop.querySelector('#trailerIframe');

    close.addEventListener('click', () => closeModal());
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });

    play.addEventListener('click', () => {
        trailerWrap.hidden = false;
        iframe.src = movie.trailer + '?autoplay=1&rel=0';
    });

    document.body.appendChild(backdrop);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
    document.querySelectorAll('iframe').forEach(f => f.src = '');
    document.body.style.overflow = 'auto';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Booking stub
function openBooking(movie) {
    alert(`Booking (demo) � ${movie.title}\nThis is a placeholder for a full booking flow.`);
}

// small helper: debounce
function debounce(fn, wait = 200) {
    let t;
    return function (...args) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), wait); };
}

// optional: animate entry
document.querySelectorAll('.card-movie').forEach((c, i) => {
    c.style.opacity = 0;
    setTimeout(() => c.style.transition = 'opacity .6s ease, transform .6s ease', 60 * i);
    setTimeout(() => c.style.opacity = 1, 120);
});
