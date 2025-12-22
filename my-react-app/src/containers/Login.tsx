import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // للرجوع عالهوم

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1️⃣ حفظ البيانات بالـ localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        isLoggedIn: true,
      })
    );

    // 2️⃣ الرجوع للصفحة الرئيسية
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="brand-title">ELITE CINEMA</h1>
        <p className="muted">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn primary" type="submit">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <span className="muted">Back to</span>{" "}
          <NavLink to="/" className="link">
            Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;