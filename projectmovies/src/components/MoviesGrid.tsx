import type {Movie}  from "../containers/WatchPage";

type Props = {
  movies: Movie[];
  onWatch: (movie: Movie) => void;
};

function MoviesGrid({ movies, onWatch }: Props) {
  return (
      <main className="movies-grid" id="moviesGrid">
        {movies.length === 0 && <div>No movies found.</div>}
        {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <div className="poster">
                <img src={movie.poster} alt={movie.title} loading="lazy"/>

              </div>

            </div>
        ))}
      </main>

  );
}
export default MoviesGrid;