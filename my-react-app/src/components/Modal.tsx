import { Movie } from "../containers/Home";
interface Props { movie: Movie; onClose: () => void; }
const Modal = ({ movie, onClose }: Props) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>

        <img
          src={movie.poster}
          alt={movie.title}
          className="modal-poster"
        />


        <div className="modal-right">
         <h2 id="modalTitle">Title</h2>
          <p id="modalGenres" className="muted"></p>
          <p id="modalDesc"></p>
           <div className="meta-row">
            <div>Length: <strong id="modalLength"></strong> min</div>
            <div>Rating: <strong id="modalRating"></strong></div>
           <div>Language: <strong id="modalLang"></strong></div>
           </div>
          <div className="modal-actions">
           <button className="btn primary" id="playTrailer">Play Trailer</button>
            <button className="btn" id="openBook">Start Booking</button>
            </div>
                        <div className="trailer" id="trailerWrap" hidden>
                            <iframe id="trailerIframe" src=""  title="Trailer"></iframe>
                        </div>
                    </div>


      </div>


    </div>
  );
};
export default Modal;