import { NavLink } from "react-router-dom";
import { Movie } from "../containers/Home/Home";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: Movie;
  onClose: () => void;
}

const Modal = ({ movie, onClose }: Props) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  return (
   <div className="modal-backdrop" onClick={onClose}>
  <div className="modal-card" onClick={(e) => e.stopPropagation()}>
    <button className="close" onClick={onClose}>×</button>

    {/* grid أساسي */}
    <div className="modal-grid">

      {/* اليسار: البوستر */}
      <div
        className="big-poster"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />

      {/* اليمين */}
      <div className="modal-right">

        {/* معلومات الفيلم */}
        <div className="modal-info">
          <h2>{movie.title}</h2>
          <p className="muted">{movie.genres}</p>
          <p>{movie.desc}</p>

          <div className="meta-row">
            <div>Length: <strong>{movie.length}</strong> min</div>
            <div>Rating: <strong>{movie.rating}</strong></div>
            <div>Language: <strong>{movie.lang}</strong></div>
          </div>

          <div className="modal-actions">
            <button
              className="btn primary"
              onClick={() => setShowTrailer(prev => !prev)}
            >
              {showTrailer ? "Hide Trailer" : "Play Trailer"}
            </button>

            <NavLink to="/BookingContainer" className="btn ghost">
              Start Booking
            </NavLink>
          </div>
        </div>

        {/* التريلر تحت */}
        {showTrailer && (
          <div className="trailer">
            <iframe
              src={movie.trailer}
              title="Trailer"
              allowFullScreen
            />
          </div>
        )}

      </div>
    </div>
  </div>
</div>

  );
};

export default Modal;
