// MoviesGrid.tsx
import MovieCard from "./MovieCard";
import { Movie } from "../containers/Home/Home";

interface Props {
  movies: Movie[];
  onAction: (movie: Movie, action: string) => void;
}

const MoviesGrid = ({ movies, onAction }: Props) => {
  return (
    <main className="movies-grid">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} onAction={onAction} />
      ))}
    </main>
  );
};

export default MoviesGrid;
