import { NavLink } from "react-router-dom";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const Header = ({ search, onSearchChange }: HeaderProps) => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="nav">
      <div className="brand">
        <div><img src=""/></div>
        <div>
          <div className="brand-title">CINEMA UNIVERSE</div>
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

        {parsedUser?.isLoggedIn ? (
          <div className="user-avatar" onClick={handleLogout}>
            {parsedUser.email.charAt(0).toUpperCase()}
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