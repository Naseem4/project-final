// Header.tsx
import { NavLink, useNavigate } from "react-router-dom";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const Header = ({ search, onSearchChange }: HeaderProps) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  const isLoggedIn = parsedUser?.isLoggedIn === true;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  const iconuser = () => {
    if (!parsedUser) return "";
    if (parsedUser.name) return parsedUser.name.charAt(0).toUpperCase();
    if (parsedUser.email) return parsedUser.email.charAt(0).toUpperCase();
    return "";
  };

  // عشان ما يدخل بدون تسجيل دخول
  const handleWatchClick = () => {
    if (!isLoggedIn) {
      alert("You must be logged in to watch free movies");
      navigate("/Login");
    } else {
      navigate("/WatchPage");
    }
  };

  return (
    <nav className="nav">
      <div className="brand">
        <div>
          <div className="brand-title">ELITE-CINEMA</div>
          <div className="brand-sub">Premium Movie Experience</div>
        </div>
      </div>

      <div className="nav-actions">
        <input
          className="search"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <button className="btn ghost" onClick={handleWatchClick}>
          Watch
        </button>

        {isLoggedIn ? (
          <div
            className="user-avatar"
            title="Logout"
            onClick={handleLogout}
          >
            {iconuser()}
          </div>
        ) : (
          <NavLink to="/Login" className="btn subtle">
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
