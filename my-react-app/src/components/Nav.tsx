import { NavLink } from "react-router-dom";
type Props = {
  search: string;
  onSearchChange: (v: string) => void;
};

const Nav = ({ search, onSearchChange }: Props) => {
  return (
    <nav className="cinema-nav">
      <div className="cinema-brand">
        <div className="cinema-logo">
          <img
            src="./public/images/projectlogo.png"
            alt="  ELITE CINEMA LOGO"
            className="cinema-logo-img"
          />
        </div>
        <div>
          <div className="cinema-brand-title">CINEMA UNIVERSE</div>
          <div className="cinema-brand-sub">Watch Online</div>
        </div>
      </div>

      <div className="cinema-nav-actions">
        <input
          type="text"
          id="search"
          placeholder="Search movies, genres or keyword..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <NavLink to ="/ "className="cinema-home-btn" type="button">
          Home Page
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;