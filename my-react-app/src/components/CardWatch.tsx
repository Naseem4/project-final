import type { Movie as MovieModal } from "../containers/WatchPage/WatchPage";

type CardWatchProps = {
  movie: MovieModal | null;
  onClose: () => void;
};

const CardWatch = ({ movie, onClose }: CardWatchProps) => {
  if (!movie) return null;

  return (
    <div className="cinema-modal-backdrop">
      <div className="cinema-modal-card">
        <button className="cinema-modal-close" onClick={onClose}>
          ×
        </button>
        <h2>{movie.title}</h2>
        <video controls>
          <source src={movie.trailer} type="video/mp4" />
          Your browser does not support video.
        </video>
      </div>
    </div>
  );
};

export default CardWatch;