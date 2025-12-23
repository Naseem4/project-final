import type { Movie } from "../../../projectmovies/src/containers/WatchPage";

type MoviesGridProps = {
  movies: Movie[];
  onWatch: (movie: Movie) => void;
};

function MoviesGrid({ movies, onWatch }: MoviesGridProps) {
  return (
    <main className="cinema-movies-grid" id="moviesGrid">
      {movies.length === 0 && <div>No movies found.</div>}

      {movies.map((movie) => (
        <div className="cinema-movie-card" key={movie.id}>
          <div className="cinema-poster">
            <img src={movie.poster} alt={movie.title} loading="lazy" />
          </div>

          <div className="movie-title">{movie.title}</div>

          <div style={{ color: "#97a6bf", fontSize: 12 }}>
            {movie.genres && movie.genres.length > 0
              ? movie.genres.join(" • ")
              : "No genres"}
          </div>

          <div className="movie-actions">
            <button className="cinema-watch-btn" onClick={() => onWatch(movie)}>
              Watch
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

export default MoviesGrid;