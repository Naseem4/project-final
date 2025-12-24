import { NavLink } from "react-router-dom"
const Hero = () => {
  return (
    <header className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">
          Your best cinematic Experience
        </h1>

        <p className="hero-lead">
          IMAX-grade visuals, Dolby Atmos sound, effortless booking.
        </p>

        <div className="movie-poster">
          <img
            src="https://m.media-amazon.com/images/S/pv-target-images/3de84cca07fc963b66a01a5465c2638066119711e89c707ce952555783dd4b4f.jpg"
            alt="Movie Poster"
          />
        </div>

        <div className="hero-ctas">
          <NavLink to="/BookingContainer" className="btn primary" id="bookNow">
            Book Tickets
          </NavLink>
          <button className="btn ghost" id="watchPromo">
            Watch Trailer
          </button>
        </div>
      </div>

      <div className="hero-aside" aria-hidden="true">
        <div className="card small">
          <div className="card-title">Next Showing</div>
          <div className="card-time">19:30 — Hall 1</div>
          <div className="card-meta">
            Available seats <strong>24</strong>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero