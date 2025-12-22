// MovieCard.tsx
import { Movie } from "../containers/Home";

interface Props {
  movie: Movie;
  onAction: (movie: Movie, action: string) => void;
}

const MovieCard = ({ movie, onAction }: Props) => {
  return (
    <article className="card-movie">
      <div
        className="poster"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />
      <div className="movie-title">{movie.title}</div>
      <div className="movie-meta">
        <span>{movie.genres.join(" • ")}</span>
        <span>{movie.length} min</span>
      </div>
      <button className="btn" onClick={() => onAction(movie, "details")}>Details</button>
      <button className="btn primary" onClick={() => onAction(movie, "book")}>Book</button>
    </article>
  );
};

export default MovieCard;
