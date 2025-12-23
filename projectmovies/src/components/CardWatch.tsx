import type{ Movie} from "../containers/WatchPage";

type Props = {
  movie: Movie | null;
  onClose: () => void;
};

const CardWatch = ({ movie, onClose }: Props) => {
  if (!movie) return null;

  return (
      <div className="modal-backdrop">
        <div className="modal-card">
          <button className="close" onClick={onClose}>×</button>
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